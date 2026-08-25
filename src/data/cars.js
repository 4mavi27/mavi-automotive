import bmwImage from "../assets/cars/bmw.png"
import audiImage from "../assets/cars/audi.png"
import mercedesImage from "../assets/cars/mercedes.png"
import fordImage from "../assets/cars/ford.png"

const cars = [
  {
    id: 1,
    make: "BMW",
    model: "320d",
    price: 18995,
    year: 2021,
    mileage: 42000,
    fuel: "Diesel",
    featured: true,
    transmission: "Automatic",

    image: bmwImage,

    images: [
      bmwImage,
      audiImage,
      mercedesImage,
      fordImage,
      bmwImage,
      audiImage,
      mercedesImage,
      fordImage,
      fordImage,
      bmwImage,
      audiImage,
      mercedesImage,
      fordImage,
    ],
  },

  {
    id: 2,
    make: "Audi",
    model: "A4",
    price: 21495,
    year: 2022,
    mileage: 45000,
    fuel: "Petrol",
    featured: true,
    transmission: "Manual",

    image: audiImage,

    images: [
      audiImage,
      audiImage,
      audiImage,
      audiImage,
      audiImage,
      audiImage,
      audiImage,
      audiImage,
    ],
  },

  {
    id: 3,
    make: "Mercedes",
    model: "C220d",
    price: 42995,
    year: 2024,
    mileage: 52000,
    fuel: "Electric",
    featured: true,
    transmission: "Automatic",

    image: mercedesImage,

    images: [
      mercedesImage,
    ],
  },

  {
    id: 4,
    make: "Ford",
    model: "Mustang",
    price: 42995,
    year: 2024,
    mileage: 12000,
    fuel: "Petrol",
    featured: true,
    transmission: "Automatic",

    image: fordImage,

    images: [
      fordImage,
    ],
  },

  {
    id: 5,
    make: "Nissan",
    model: "Micra",
    price: 9995,
    year: 2023,
    mileage: 18000,
    fuel: "Petrol",
    featured: false,
    transmission: "Manual",

    image: fordImage,

    images: [
      fordImage,
    ],
  },

  {
    id: 6,
    make: "Toyota",
    model: "Corolla",
    price: 17995,
    year: 2022,
    mileage: 28000,
    fuel: "Petrol",
    featured: false,
    transmission: "Automatic",

    image: fordImage,

    images: [
      fordImage,
    ],
  },

  {
    id: 7,
    make: "BMW",
    model: "320d",
    price: 18995,
    year: 2021,
    mileage: 42000,
    fuel: "Diesel",
    featured: true,
    transmission: "Manual",

    image: bmwImage,

    images: [
      bmwImage,
    ],
  },

  {
    id: 8,
    make: "Audi",
    model: "A4",
    price: 21495,
    year: 2022,
    mileage: 45000,
    fuel: "Petrol",
    featured: true,
    transmission: "Automatic",

    image: audiImage,

    images: [
      audiImage,
    ],
  },

  {
    id: 9,
    make: "Mercedes",
    model: "C220d",
    price: 42995,
    year: 2024,
    mileage: 52000,
    fuel: "Electric",
    featured: true,
    transmission: "Manual",

    image: mercedesImage,

    images: [
      mercedesImage,
    ],
  },

  {
    id: 10,
    make: "Ford",
    model: "Mustang",
    price: 42995,
    year: 2024,
    mileage: 12000,
    fuel: "Petrol",
    featured: true,
    transmission: "Manual",

    image: fordImage,

    images: [
      fordImage,
    ],
  },

  {
    id: 11,
    make: "Nissan",
    model: "Micra",
    price: 9995,
    year: 2023,
    mileage: 18000,
    fuel: "Petrol",
    featured: false,
    transmission: "Automatic",

    image: fordImage,

    images: [
      fordImage,
    ],
  },

  {
    id: 12,
    make: "Land Rover",
    model: "Range Rover",
    price: 17995,
    year: 2022,
    mileage: 28000,
    fuel: "Petrol",
    featured: false,
    transmission: "Automatic",

    image: fordImage,

    images: [
      fordImage,
    ],
  },
]

export default cars