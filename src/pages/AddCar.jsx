import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import "./AddCar.css"

function AddCar() {
    // =========================================
    // FORM STATE
    // =========================================

    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [price, setPrice] = useState("")
    const [year, setYear] = useState("")
    const [mileage, setMileage] = useState("")
    const [fuel, setFuel] = useState("Petrol")
    const [transmission, setTransmission] =
        useState("Automatic")
    const [featured, setFeatured] = useState(false)

    // Multiple images
    const [images, setImages] = useState([])

    // Preview URLs
    const [imagePreviews, setImagePreviews] = useState([])

    // Form status
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    // File input reference
    const fileInputRef = useRef(null)

    // =========================================
    // CREATE IMAGE PREVIEWS
    // =========================================

    useEffect(() => {
        const previews = images.map((image) =>
            URL.createObjectURL(image)
        )

        setImagePreviews(previews)

        return () => {
            previews.forEach((preview) => {
                URL.revokeObjectURL(preview)
            })
        }
    }, [images])

    // =========================================
    // ADD IMAGES
    // =========================================

    const handleImageChange = (event) => {
        const selectedImages = Array.from(
            event.target.files
        )

        setImages((currentImages) => {
            const combinedImages = [
                ...currentImages,
                ...selectedImages,
            ]

            // Remove duplicates
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

            // Maximum 10 images
            return uniqueImages.slice(0, 25)
        })

        // Allows selecting the same image again later
        event.target.value = ""
    }

    // =========================================
    // REMOVE IMAGE
    // =========================================

    const handleRemoveImage = (indexToRemove) => {
        setImages((currentImages) =>
            currentImages.filter(
                (image, index) => index !== indexToRemove
            )
        )
    }

    // =========================================
    // SUBMIT FORM
    // =========================================

    const handleSubmit = async (event) => {
        event.preventDefault()

        setSubmitted(false)
        setErrorMessage("")

        // Required fields
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

        // Require at least one image
        if (images.length === 0) {
            setErrorMessage(
                "Please upload at least one vehicle image."
            )
            return
        }

        try {
            setIsSubmitting(true)

            // =====================================
            // STEP 1: UPLOAD IMAGES
            // =====================================

            const formData = new FormData()

            images.forEach((image) => {
                formData.append("images", image)
            })

            const uploadResponse = await fetch(
                "http://localhost:5000/api/upload",
                {
                    method: "POST",
                    body: formData,
                }
            )

            if (!uploadResponse.ok) {
                throw new Error("Image upload failed")
            }

            const uploadData =
                await uploadResponse.json()

            // =====================================
            // STEP 2: CREATE CAR OBJECT
            // =====================================

            const newCar = {
                make,
                model,
                price: Number(price),
                year: Number(year),
                mileage: Number(mileage),
                fuel,
                transmission,
                featured,
                images: uploadData.images,
            }

            // =====================================
            // STEP 3: SAVE CAR TO MONGODB
            // =====================================

            const carResponse = await fetch(
                "http://localhost:5000/api/cars",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newCar),
                }
            )

            if (!carResponse.ok) {
                throw new Error("Failed to add car")
            }

            const savedCar =
                await carResponse.json()

            console.log(savedCar)

            // =====================================
            // SUCCESS
            // =====================================

            setSubmitted(true)

            // Reset form
            setMake("")
            setModel("")
            setPrice("")
            setYear("")
            setMileage("")
            setFuel("Petrol")
            setTransmission("Automatic")
            setFeatured(false)
            setImages([])

            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        } catch (error) {
            console.log(error)

            setErrorMessage(
                "Something went wrong. Please try again."
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    // =========================================
    // MAIN PREVIEW IMAGE
    // =========================================

    const mainPreviewImage =
        imagePreviews.length > 0
            ? imagePreviews[0]
            : null

    return (
        <section className="add-car-page">

            {/* =====================================
          TOP BAR
      ===================================== */}

            <div className="add-car-topbar">
                <div>


                    <h1>Add New Car</h1>

                    <p className="add-car-subtitle">
                        Add a new vehicle to your inventory.
                    </p>
                </div>

                <Link
                    to="/admin/cars"
                    className="back-to-cars-btn"
                >
                    ← Back to Cars
                </Link>
            </div>

            {/* =====================================
          PAGE GRID
      ===================================== */}

            <form
                className="add-car-layout"
                onSubmit={handleSubmit}
            >

                {/* =================================
            LEFT SIDE
        ================================= */}

                <div className="add-car-form-card">

                    <h2>Basic Information</h2>

                    <div className="add-car-fields-grid">

                        <div className="form-group">
                            <label>
                                Make <span>*</span>
                            </label>

                            <input
                                type="text"
                                placeholder="e.g. BMW"
                                value={make}
                                onChange={(event) =>
                                    setMake(event.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Model <span>*</span>
                            </label>

                            <input
                                type="text"
                                placeholder="e.g. M3"
                                value={model}
                                onChange={(event) =>
                                    setModel(event.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Year <span>*</span>
                            </label>

                            <input
                                type="number"
                                placeholder="e.g. 2023"
                                value={year}
                                onChange={(event) =>
                                    setYear(event.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Price (£) <span>*</span>
                            </label>

                            <input
                                type="number"
                                placeholder="e.g. 45000"
                                value={price}
                                onChange={(event) =>
                                    setPrice(event.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Mileage <span>*</span>
                            </label>

                            <input
                                type="number"
                                placeholder="e.g. 67000"
                                value={mileage}
                                onChange={(event) =>
                                    setMileage(event.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>Fuel</label>

                            <select
                                value={fuel}
                                onChange={(event) =>
                                    setFuel(event.target.value)
                                }
                            >
                                <option>Petrol</option>
                                <option>Diesel</option>
                                <option>Electric</option>
                                <option>Hybrid</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Transmission</label>

                            <select
                                value={transmission}
                                onChange={(event) =>
                                    setTransmission(
                                        event.target.value
                                    )
                                }
                            >
                                <option>Automatic</option>
                                <option>Manual</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Featured</label>

                            <select
                                value={featured}
                                onChange={(event) =>
                                    setFeatured(
                                        event.target.value === "true"
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

                    </div>

                    {/* =================================
              IMAGES
          ================================= */}

                    <div className="add-car-images-section">

                        <div className="images-section-heading">
                            <div>
                                <h2>Images</h2>

                                <p>
                                    Upload up to 25 images. The first
                                    image will be used as the main image.
                                </p>
                            </div>

                            <span>
                                {images.length}/25
                            </span>
                        </div>

                        <div
                            className="image-upload-box"
                            onClick={() =>
                                fileInputRef.current?.click()
                            }
                        >
                            <div className="upload-icon">
                                ↑
                            </div>

                            <strong>
                                Choose vehicle images
                            </strong>

                            <p>
                                JPG, PNG or WEBP — maximum 25 images
                            </p>

                            <button
                                type="button"
                                className="choose-images-btn"
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

                        {/* Image previews */}

                        {imagePreviews.length > 0 && (
                            <div className="image-preview-grid">

                                {imagePreviews.map(
                                    (preview, index) => (
                                        <div
                                            className="upload-preview-item"
                                            key={preview}
                                        >
                                            <img
                                                src={preview}
                                                alt={`Vehicle preview ${index + 1
                                                    }`}
                                            />

                                            {index === 0 && (
                                                <span className="main-image-badge">
                                                    Main
                                                </span>
                                            )}

                                            <button
                                                type="button"
                                                className="remove-image-btn"
                                                onClick={(event) => {
                                                    event.stopPropagation()

                                                    handleRemoveImage(index)
                                                }}
                                                aria-label="Remove image"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )
                                )}

                            </div>
                        )}

                    </div>

                    {/* Messages */}

                    {errorMessage && (
                        <p className="add-car-error">
                            {errorMessage}
                        </p>
                    )}

                    {submitted && (
                        <p className="add-car-success">
                            Car added successfully.
                        </p>
                    )}

                </div>

                {/* =================================
            RIGHT SIDE
        ================================= */}

                <aside className="add-car-preview-column">

                    <div className="car-preview-card">

                        <h2>Preview</h2>

                        <div className="car-preview-image">

                            {mainPreviewImage ? (
                                <img
                                    src={mainPreviewImage}
                                    alt="Main vehicle preview"
                                />
                            ) : (
                                <div className="preview-placeholder">
                                    <span>🚗</span>
                                    <p>
                                        Your main vehicle image will
                                        appear here
                                    </p>
                                </div>
                            )}

                        </div>

                        {/* Preview thumbnails */}

                        {imagePreviews.length > 0 && (
                            <div className="preview-thumbnails">

                                {imagePreviews.map(
                                    (preview, index) => (
                                        <img
                                            key={preview}
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className={
                                                index === 0
                                                    ? "preview-thumbnail-active"
                                                    : ""
                                            }
                                        />
                                    )
                                )}

                            </div>
                        )}

                        <div className="preview-car-heading">

                            <div>
                                <h3>
                                    {make || "Vehicle Make"}{" "}
                                    {model || "Model"}
                                </h3>

                                <strong>
                                    £
                                    {price
                                        ? Number(
                                            price
                                        ).toLocaleString()
                                        : "0"}
                                </strong>
                            </div>

                            <span className="featured-preview-badge">
                                {featured
                                    ? "Featured"
                                    : "Not Featured"}
                            </span>

                        </div>

                        <div className="preview-specs">

                            <div>
                                <span>Year</span>
                                <strong>
                                    {year || "—"}
                                </strong>
                            </div>

                            <div>
                                <span>Mileage</span>
                                <strong>
                                    {mileage
                                        ? `${Number(
                                            mileage
                                        ).toLocaleString()} miles`
                                        : "—"}
                                </strong>
                            </div>

                            <div>
                                <span>Fuel</span>
                                <strong>{fuel}</strong>
                            </div>

                            <div>
                                <span>Transmission</span>
                                <strong>
                                    {transmission}
                                </strong>
                            </div>

                        </div>

                    </div>

                    {/* Tips */}

                    <div className="add-car-tips-card">

                        <h2>Tips</h2>

                        <p>
                            <span>1</span>
                            Upload clear exterior and interior
                            images.
                        </p>

                        <p>
                            <span>2</span>
                            The first image becomes the main image.
                        </p>

                        <p>
                            <span>3</span>
                            You can upload up to 25 images per car.
                        </p>

                        <p>
                            <span>4</span>
                            Check all vehicle information before
                            publishing.
                        </p>

                    </div>

                </aside>

                {/* =================================
            ACTIONS
        ================================= */}

                <div className="add-car-actions">

                    <Link
                        to="/admin/cars"
                        className="cancel-add-car-btn"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        className="submit-add-car-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Adding Car..."
                            : "Add Car"}
                    </button>

                </div>

            </form>

        </section>
    )
}

export default AddCar