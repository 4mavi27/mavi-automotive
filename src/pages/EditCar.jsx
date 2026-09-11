import { useEffect, useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./EditCar.css"

function EditCar() {
    const { id } = useParams()
    const navigate = useNavigate()

    // =========================================
    // FORM STATE
    // =========================================

    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [price, setPrice] = useState("")
    const [year, setYear] = useState("")
    const [mileage, setMileage] = useState("")
    const [fuel, setFuel] = useState("Petrol")
    const [transmission, setTransmission] = useState("Automatic")
    const [featured, setFeatured] = useState(false)

    // Existing image URLs from MongoDB
    const [images, setImages] = useState([])

    // New files selected from computer
    const [newImages, setNewImages] = useState([])

    // Preview URLs for new files
    const [newImagePreviews, setNewImagePreviews] = useState([])

    const [loading, setLoading] = useState(true)
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const fileInputRef = useRef(null)

    // =========================================
    // LOAD CAR
    // =========================================

    useEffect(() => {
        fetch(`http://localhost:5000/api/cars/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch car")
                }

                return response.json()
            })
            .then((data) => {
                setMake(data.make)
                setModel(data.model)
                setPrice(data.price)
                setYear(data.year)
                setMileage(data.mileage)
                setFuel(data.fuel)
                setTransmission(data.transmission)
                setFeatured(data.featured)

                // Existing image URLs
                setImages(data.images || [])

                setLoading(false)
            })
            .catch((error) => {
                console.error("Failed to fetch car:", error)

                setErrorMessage(
                    "Failed to load vehicle details."
                )

                setLoading(false)
            })
    }, [id])

    // =========================================
    // CREATE PREVIEWS FOR NEW IMAGES
    // =========================================

    useEffect(() => {
        const previews = newImages.map((image) =>
            URL.createObjectURL(image)
        )

        setNewImagePreviews(previews)

        return () => {
            previews.forEach((preview) => {
                URL.revokeObjectURL(preview)
            })
        }
    }, [newImages])

    // =========================================
    // ADD NEW IMAGES
    // =========================================

    const handleImageChange = (event) => {
        const selectedImages = Array.from(
            event.target.files
        )

        setNewImages((currentImages) => {
            const combinedImages = [
                ...currentImages,
                ...selectedImages
            ]

            // Remove duplicate files
            const uniqueImages = combinedImages.filter(
                (image, index, array) => {
                    return (
                        index ===
                        array.findIndex(
                            (currentImage) =>
                                currentImage.name === image.name &&
                                currentImage.size === image.size &&
                                currentImage.lastModified ===
                                    image.lastModified
                        )
                    )
                }
            )

            // Total existing + new cannot exceed 25
            const availableSlots =
                Math.max(25 - images.length, 0)

            return uniqueImages.slice(
                0,
                availableSlots
            )
        })

        // Allow same file to be selected again later
        event.target.value = ""
    }

    // =========================================
    // REMOVE EXISTING IMAGE
    // =========================================

    const handleRemoveExistingImage = (
        indexToRemove
    ) => {
        setImages((currentImages) =>
            currentImages.filter(
                (image, index) =>
                    index !== indexToRemove
            )
        )
    }

    // =========================================
    // REMOVE NEW IMAGE
    // =========================================

    const handleRemoveNewImage = (
        indexToRemove
    ) => {
        setNewImages((currentImages) =>
            currentImages.filter(
                (image, index) =>
                    index !== indexToRemove
            )
        )
    }

    // =========================================
    // SUBMIT
    // =========================================

    const handleSubmit = async (event) => {
        event.preventDefault()

        setSubmitted(false)
        setErrorMessage("")

        if (
            !make ||
            !model ||
            !price ||
            !year ||
            !mileage
        ) {
            setErrorMessage(
                "Please fill in all required fields."
            )

            return
        }

        if (
            images.length === 0 &&
            newImages.length === 0
        ) {
            setErrorMessage(
                "Please keep or upload at least one vehicle image."
            )

            return
        }

        if (
            images.length + newImages.length > 25
        ) {
            setErrorMessage(
                "You can have a maximum of 25 images."
            )

            return
        }

        try {
            setIsSubmitting(true)

            // =====================================
            // STEP 1: UPLOAD ONLY NEW IMAGES
            // =====================================

            let uploadedNewImages = []

            if (newImages.length > 0) {
                const formData = new FormData()

                newImages.forEach((image) => {
                    formData.append("images", image)
                })

                const uploadResponse = await fetch(
                    "http://localhost:5000/api/upload",
                    {
                        method: "POST",
                        body: formData
                    }
                )

                if (!uploadResponse.ok) {
                    throw new Error(
                        "Image upload failed"
                    )
                }

                const uploadData =
                    await uploadResponse.json()

                uploadedNewImages =
                    uploadData.images || []
            }

            // =====================================
            // STEP 2: MERGE EXISTING + NEW URLs
            // =====================================

            const finalImages = [
                ...images,
                ...uploadedNewImages
            ]

            // =====================================
            // STEP 3: CREATE UPDATED CAR
            // =====================================

            const updatedCar = {
                make,
                model,
                price: Number(price),
                year: Number(year),
                mileage: Number(mileage),
                fuel,
                transmission,
                featured,
                images: finalImages
            }

            // =====================================
            // STEP 4: UPDATE MONGODB
            // =====================================

            const response = await fetch(
                `http://localhost:5000/api/cars/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify(updatedCar)
                }
            )

            if (!response.ok) {
                throw new Error(
                    "Failed to update car"
                )
            }

            const data = await response.json()

            console.log("Updated car:", data)

            setSubmitted(true)

            // Update local state with final images
            setImages(finalImages)

            // Clear newly selected files
            setNewImages([])

            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }

            setTimeout(() => {
                navigate("/admin/cars")
            }, 1000)
        } catch (error) {
            console.error(
                "Update error:",
                error
            )

            setErrorMessage(
                "Something went wrong. Please try again."
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    // =========================================
    // TOTAL IMAGE COUNT
    // =========================================

    const totalImages =
        images.length + newImages.length

    if (loading) {
        return (
            <section className="edit-car-page">
                <p className="edit-loading">
                    Loading car details...
                </p>
            </section>
        )
    }

    return (
        <section className="edit-car-page">

            <div className="edit-car-container">

                {/* HEADER */}

                <div className="edit-car-header">

                    <div>
                        <p className="edit-car-label">
                            Admin Panel
                        </p>

                        <h1>Edit Car</h1>

                        <p>
                            Update vehicle details and
                            manage vehicle images.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="back-button"
                        onClick={() =>
                            navigate("/admin/cars")
                        }
                    >
                        Back to Manage Cars
                    </button>

                </div>

                <form
                    className="edit-car-form"
                    onSubmit={handleSubmit}
                >

                    {/* BASIC INFORMATION */}

                    <div className="form-group">
                        <label>Make</label>

                        <input
                            type="text"
                            value={make}
                            onChange={(event) =>
                                setMake(
                                    event.target.value
                                )
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Model</label>

                        <input
                            type="text"
                            value={model}
                            onChange={(event) =>
                                setModel(
                                    event.target.value
                                )
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Price (£)</label>

                        <input
                            type="number"
                            value={price}
                            onChange={(event) =>
                                setPrice(
                                    event.target.value
                                )
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Year</label>

                        <input
                            type="number"
                            value={year}
                            onChange={(event) =>
                                setYear(
                                    event.target.value
                                )
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Mileage</label>

                        <input
                            type="number"
                            value={mileage}
                            onChange={(event) =>
                                setMileage(
                                    event.target.value
                                )
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Fuel</label>

                        <select
                            value={fuel}
                            onChange={(event) =>
                                setFuel(
                                    event.target.value
                                )
                            }
                        >
                            <option>Petrol</option>
                            <option>Diesel</option>
                            <option>Electric</option>
                            <option>Hybrid</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>
                            Transmission
                        </label>

                        <select
                            value={transmission}
                            onChange={(event) =>
                                setTransmission(
                                    event.target.value
                                )
                            }
                        >
                            <option>
                                Automatic
                            </option>

                            <option>
                                Manual
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Featured</label>

                        <select
                            value={featured}
                            onChange={(event) =>
                                setFeatured(
                                    event.target.value ===
                                        "true"
                                )
                            }
                        >
                            <option value="false">
                                No
                            </option>

                            <option value="true">
                                Yes
                            </option>
                        </select>
                    </div>

                    {/* IMAGE MANAGEMENT */}

                    <div className="edit-images-section">

                        <div className="edit-images-heading">

                            <div>
                                <h2>
                                    Vehicle Images
                                </h2>

                                <p>
                                    Remove existing images
                                    or add new ones. The first
                                    image is used as the main
                                    image.
                                </p>
                            </div>

                            <span className="edit-image-count">
                                {totalImages}/25
                            </span>

                        </div>

                        {/* ADD IMAGE BOX */}

                        <div
                            className="edit-image-upload-box"
                            onClick={() =>
                                fileInputRef.current?.click()
                            }
                        >
                            <div className="edit-upload-icon">
                                ↑
                            </div>

                            <strong>
                                Add vehicle images
                            </strong>

                            <p>
                                JPG, PNG or WEBP — maximum
                                25 images
                            </p>

                            <button
                                type="button"
                                className="edit-choose-images-btn"
                            >
                                Choose Images
                            </button>
                        </div>

                        <input
                            ref={fileInputRef}
                            className="hidden-file-input"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        {/* ALL IMAGE PREVIEWS */}

                        <div className="edit-images-grid">

                            {/* EXISTING IMAGES */}

                            {images.map(
                                (image, index) => (
                                    <div
                                        className="edit-image-item"
                                        key={`existing-${image}-${index}`}
                                    >
                                        <img
                                            src={image}
                                            alt={`Vehicle ${
                                                index + 1
                                            }`}
                                        />

                                        {index === 0 && (
                                            <span className="main-image-label">
                                                Main
                                            </span>
                                        )}

                                        <button
                                            type="button"
                                            className="edit-remove-image-btn"
                                            onClick={() =>
                                                handleRemoveExistingImage(
                                                    index
                                                )
                                            }
                                            aria-label="Remove image"
                                        >
                                            ×
                                        </button>
                                    </div>
                                )
                            )}

                            {/* NEW IMAGES */}

                            {newImagePreviews.map(
                                (preview, index) => {
                                    const finalIndex =
                                        images.length +
                                        index

                                    return (
                                        <div
                                            className="edit-image-item"
                                            key={`new-${preview}`}
                                        >
                                            <img
                                                src={
                                                    preview
                                                }
                                                alt={`New vehicle ${
                                                    index +
                                                    1
                                                }`}
                                            />

                                            {finalIndex ===
                                                0 && (
                                                <span className="main-image-label">
                                                    Main
                                                </span>
                                            )}

                                            <span className="new-image-badge">
                                                New
                                            </span>

                                            <button
                                                type="button"
                                                className="edit-remove-image-btn"
                                                onClick={() =>
                                                    handleRemoveNewImage(
                                                        index
                                                    )
                                                }
                                                aria-label="Remove new image"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )
                                }
                            )}

                        </div>

                        {totalImages === 0 && (
                            <p className="no-images-message">
                                No images selected.
                            </p>
                        )}

                    </div>

                    {/* ERROR */}

                    {errorMessage && (
                        <p className="edit-error-message">
                            {errorMessage}
                        </p>
                    )}

                    {/* SUCCESS */}

                    {submitted && (
                        <p className="edit-success-message">
                            Car updated successfully.
                        </p>
                    )}

                    {/* ACTIONS */}

                    <div className="edit-form-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() =>
                                navigate(
                                    "/admin/cars"
                                )
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="update-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "Updating Car..."
                                : "Update Car"}
                        </button>

                    </div>

                </form>

            </div>

        </section>
    )
}

export default EditCar