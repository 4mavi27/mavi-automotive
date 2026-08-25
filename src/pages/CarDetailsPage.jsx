import "./CarDetailsPage.css"
import { useParams, Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import cars from "../data/cars.js"

function CarDetailsPage() {
  const { id } = useParams()

  // Current car
  const car = cars.find((car) => {
    return car.id === Number(id)
  })

  // Selected thumbnail
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Lightbox
  const [isImageOpen, setIsImageOpen] = useState(false)

  // Zoom
  const [zoomLevel, setZoomLevel] = useState(1)

  // Zoomed image position
  const [imagePosition, setImagePosition] = useState({
    x: 0,
    y: 0,
  })

  // Dragging state
  const [isDragging, setIsDragging] = useState(false)

  // Starting point of drag
  const dragStartRef = useRef({
    x: 0,
    y: 0,
  })

  // Thumbnail gallery
  const thumbnailViewportRef = useRef(null)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)


  // =========================================
  // UPDATE GALLERY ARROWS
  // =========================================

  const updateGalleryArrows = () => {
    const gallery = thumbnailViewportRef.current

    if (!gallery) {
      return
    }

    const maxScrollLeft =
      gallery.scrollWidth - gallery.clientWidth

    setCanScrollLeft(
      gallery.scrollLeft > 1
    )

    setCanScrollRight(
      gallery.scrollLeft < maxScrollLeft - 1
    )
  }


  // =========================================
  // CAR CHANGE
  // =========================================

  useEffect(() => {
    if (!car) {
      return
    }

    setSelectedImageIndex(0)

    setIsImageOpen(false)

    setZoomLevel(1)

    setImagePosition({
      x: 0,
      y: 0,
    })

    const gallery = thumbnailViewportRef.current

    if (gallery) {
      gallery.scrollLeft = 0
    }

    const timer = setTimeout(() => {
      updateGalleryArrows()
    }, 0)

    window.addEventListener(
      "resize",
      updateGalleryArrows
    )

    return () => {
      clearTimeout(timer)

      window.removeEventListener(
        "resize",
        updateGalleryArrows
      )
    }
  }, [car])


  // =========================================
  // ESC KEY
  // =========================================

  useEffect(() => {
    const handleKeyDown = (event) => {

      // Close
      if (event.key === "Escape") {
        closeImage()
      }

      // Zoom +
      if (
        event.key === "+" ||
        event.key === "="
      ) {
        zoomIn()
      }

      // Zoom -
      if (event.key === "-") {
        zoomOut()
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    )

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      )
    }
  })


  // =========================================
  // STOP BODY SCROLL WHEN LIGHTBOX OPEN
  // =========================================

  useEffect(() => {
    if (isImageOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isImageOpen])


  // =========================================
  // CAR NOT FOUND
  // =========================================

  if (!car) {
    return (
      <section className="car-details-page">
        <h1>Car not found</h1>
      </section>
    )
  }


  // =========================================
  // CURRENT IMAGE
  // =========================================

  const currentImage =
    car.images?.[selectedImageIndex] ||
    car.image


  // =========================================
  // OPEN IMAGE
  // =========================================

  function openImage() {
    setZoomLevel(1)

    setImagePosition({
      x: 0,
      y: 0,
    })

    setIsImageOpen(true)
  }


  // =========================================
  // CLOSE IMAGE
  // =========================================

  function closeImage() {
    setIsImageOpen(false)

    setZoomLevel(1)

    setImagePosition({
      x: 0,
      y: 0,
    })

    setIsDragging(false)
  }


  // =========================================
  // ZOOM IN
  // =========================================

  function zoomIn() {
    setZoomLevel((currentZoom) => {

      if (currentZoom >= 3) {
        return 3
      }

      return currentZoom + 0.5
    })
  }


  // =========================================
  // ZOOM OUT
  // =========================================

  function zoomOut() {
    setZoomLevel((currentZoom) => {

      const newZoom =
        currentZoom - 0.5

      if (newZoom <= 1) {

        setImagePosition({
          x: 0,
          y: 0,
        })

        return 1
      }

      return newZoom
    })
  }


  // =========================================
  // RESET ZOOM
  // =========================================

  function resetZoom() {
    setZoomLevel(1)

    setImagePosition({
      x: 0,
      y: 0,
    })
  }


  // =========================================
  // START DRAGGING
  // =========================================

  const handlePointerDown = (event) => {

    if (zoomLevel <= 1) {
      return
    }

    event.stopPropagation()

    setIsDragging(true)

    dragStartRef.current = {
      x:
        event.clientX -
        imagePosition.x,

      y:
        event.clientY -
        imagePosition.y,
    }

    event.currentTarget.setPointerCapture(
      event.pointerId
    )
  }


  // =========================================
  // DRAG IMAGE
  // =========================================

  const handlePointerMove = (event) => {

    if (!isDragging) {
      return
    }

    setImagePosition({
      x:
        event.clientX -
        dragStartRef.current.x,

      y:
        event.clientY -
        dragStartRef.current.y,
    })
  }


  // =========================================
  // STOP DRAGGING
  // =========================================

  const stopDragging = () => {
    setIsDragging(false)
  }


  // =========================================
  // THUMBNAIL GALLERY SCROLL
  // =========================================

  const scrollGallery = (direction) => {
    const gallery =
      thumbnailViewportRef.current

    if (!gallery) {
      return
    }

    const scrollAmount =
      gallery.clientWidth * 0.7

    gallery.scrollBy({
      left:
        direction *
        scrollAmount,

      behavior: "smooth",
    })
  }


  return (
    <>

      <section className="car-details-page">

        <div className="car-details-container">


          {/* =====================================
              LEFT SIDE
          ===================================== */}

          <div className="car-details-image">


            {/* Main Image */}

            <img
              className="main-car-image"
              src={currentImage}
              alt={`${car.make} ${car.model}`}
              onClick={openImage}
            />


            {/* =====================================
                THUMBNAIL GALLERY
            ===================================== */}

            {car.images &&
              car.images.length > 0 && (

              <div className="gallery-area">

                <div className="car-gallery-slider">


                  {/* Previous Arrow */}

                  <button
                    className={`gallery-arrow gallery-arrow-left ${
                      !canScrollLeft
                        ? "hidden-arrow"
                        : ""
                    }`}
                    onClick={() =>
                      scrollGallery(-1)
                    }
                    disabled={!canScrollLeft}
                    aria-label="Previous images"
                  >
                    ‹
                  </button>


                  {/* Thumbnail viewport */}

                  <div
                    className="thumbnail-viewport"
                    ref={thumbnailViewportRef}
                    onScroll={
                      updateGalleryArrows
                    }
                  >

                    <div className="thumbnail-track">

                      {car.images.map(
                        (image, index) => (

                          <img
                            key={index}

                            src={image}

                            alt={`${car.make} ${car.model} ${
                              index + 1
                            }`}

                            className={
                              selectedImageIndex ===
                              index
                                ? "active-thumbnail"
                                : ""
                            }

                            onClick={() =>
                              setSelectedImageIndex(
                                index
                              )
                            }

                            onLoad={
                              updateGalleryArrows
                            }
                          />

                        )
                      )}

                    </div>

                  </div>


                  {/* Next Arrow */}

                  <button
                    className={`gallery-arrow gallery-arrow-right ${
                      !canScrollRight
                        ? "hidden-arrow"
                        : ""
                    }`}
                    onClick={() =>
                      scrollGallery(1)
                    }
                    disabled={!canScrollRight}
                    aria-label="Next images"
                  >
                    ›
                  </button>


                </div>

              </div>

            )}

          </div>


          {/* =====================================
              RIGHT SIDE
          ===================================== */}

          <div className="car-details-info">


            <p className="car-details-label">
              Available Now
            </p>


            <h1>
              {car.make} {car.model}
            </h1>


            <p className="car-details-price">
              £{car.price.toLocaleString()}
            </p>


            {/* Specifications */}

            <div className="car-details-specs">


              <div className="detail-spec">

                <span>
                  Year
                </span>

                <strong>
                  {car.year}
                </strong>

              </div>


              <div className="detail-spec">

                <span>
                  Mileage
                </span>

                <strong>
                  {car.mileage.toLocaleString()} miles
                </strong>

              </div>


              <div className="detail-spec">

                <span>
                  Fuel
                </span>

                <strong>
                  {car.fuel}
                </strong>

              </div>


              <div className="detail-spec">

                <span>
                  Transmission
                </span>

                <strong>
                  {car.transmission}
                </strong>

              </div>


            </div>


            {/* Vehicle Overview */}

            <div className="car-details-description">

              <h2>
                Vehicle Overview
              </h2>

              <p>
                This {car.make} {car.model} combines
                comfort, performance and everyday
                practicality. Carefully selected by
                Mavi Automotive and ready for its next
                owner.
              </p>

            </div>


            {/* Buttons */}

            <div className="car-details-actions">


              <Link
                to={`/contact?car=${car.make}-${car.model}`}
                className="primary-detail-btn"
              >
                Enquire Now
              </Link>


              <Link
                to="/finance"
                className="secondary-detail-btn"
              >
                Apply for Finance
              </Link>


            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          FULL SCREEN LIGHTBOX
      ========================================= */}

      {isImageOpen && (

        <div
          className="image-lightbox"
          onClick={closeImage}
        >


          {/* =====================================
              ZOOM CONTROLS
          ===================================== */}

          <div
            className="lightbox-controls"
            onClick={(event) =>
              event.stopPropagation()
            }
          >


            <button
              onClick={zoomOut}
              disabled={
                zoomLevel <= 1
              }
              aria-label="Zoom out"
            >
              −
            </button>


            <span>
              {zoomLevel.toFixed(1)}x
            </span>


            <button
              onClick={zoomIn}
              disabled={
                zoomLevel >= 3
              }
              aria-label="Zoom in"
            >
              +
            </button>


            <button
              className="zoom-reset"
              onClick={resetZoom}
            >
              Reset
            </button>


          </div>


          {/* Close */}

          <button
            className="lightbox-close"
            onClick={closeImage}
            aria-label="Close image"
          >
            ×
          </button>


          {/* =====================================
              IMAGE STAGE
          ===================================== */}

          <div
            className="lightbox-stage"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <img
              className={`lightbox-image ${
                zoomLevel > 1
                  ? "lightbox-image-zoomed"
                  : ""
              } ${
                isDragging
                  ? "lightbox-image-dragging"
                  : ""
              }`}

              src={currentImage}

              alt={`${car.make} ${car.model}`}

              draggable="false"

              style={{
                transform: `
                  translate(
                    ${imagePosition.x}px,
                    ${imagePosition.y}px
                  )
                  scale(${zoomLevel})
                `,
              }}

              onPointerDown={
                handlePointerDown
              }

              onPointerMove={
                handlePointerMove
              }

              onPointerUp={
                stopDragging
              }

              onPointerCancel={
                stopDragging
              }

              onPointerLeave={
                stopDragging
              }
            />

          </div>

        </div>

      )}

    </>
  )
}

export default CarDetailsPage