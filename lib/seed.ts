import { ID, Models } from "react-native-appwrite";
import { databases, config } from "./appwrite";
import {
    agentImages,
    galleryImages,
    propertiesImages,
    reviewImages,
} from "./data";

// -------------------------------
// 📋 Types
// -------------------------------
interface PropertyDocument extends Models.Document {
    name: string;
    type: string;
    description: string;
    address: string;
    geolocation: string;
    price: number;
    area: number;
    bedrooms: number;
    bathrooms: number;
    rating: number;
    facilities: string[];
    image: string;
    agent: string;
    reviews: string[];
    gallery: string[];
}

// -------------------------------
// 📦 Collections
// -------------------------------
const COLLECTIONS = {
    AGENT: config.agentsCollectionId,
    REVIEWS: config.reviewsCollectionId,
    GALLERY: config.galleriesCollectionId,
    PROPERTY: config.propertiesCollectionId,
};

// -------------------------------
// 🏠 Property Names
// -------------------------------
const indianPropertyNames = [
    "Shanti Villa",
    "Raj Mahal",
    "Sundaram Heights",
    "Meera Residency",
    "Lakshmi Nivas",
    "Arjun Apartments",
    "Krishna Kuteer",
    "Saraswati Sadan",
    "Vishnu Enclave",
    "Ganga Residency",
    "Nilaya Nirvana",
    "Veda Villas",
    "Ananda Ashram",
    "Kamala Kunj",
    "Indira Imperial",
    "Chaitanya Towers",
    "Brahma Bhavan",
    "Daksh Residency",
    "Omkar Residency",
    "Surya Palace",
];

// -------------------------------
// 🌆 Indian Cities
// -------------------------------
const indianCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Ahmedabad",
    "Pune",
    "Jaipur",
    "Lucknow",
    "Surat",
    "Nagpur",
    "Chandigarh",
    "Coimbatore",
    "Indore",
    "Patna",
    "Bhubaneswar",
    "Visakhapatnam",
    "Vadodara",
    "Guwahati",
];

// -------------------------------
// 🏠 Property Types
// -------------------------------
const propertyTypes = [
    "House",
    "Townhouse",
    "Condo",
    "Duplex",
    "Studio",
    "Villa",
    "Apartment",
    "Other",
];

// -------------------------------
// 🛠️ Facilities
// -------------------------------
const facilities = [
    "Laundry",
    "Car Parking",
    "Sports Center",
    "Cutlery",
    "Gym",
    "Swimming Pool",
    "Wifi",
    "Pet Center",
];

// -------------------------------
// 🔀 Utility Function: Random Subset
// -------------------------------
function getRandomSubset<T>(
    array: T[],
    minItems: number,
    maxItems: number,
): T[] {
    const subsetSize =
        Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;
    return [...array].sort(() => 0.5 - Math.random()).slice(0, subsetSize);
}

// -------------------------------
// 💰 Utility Function: Random Price
// -------------------------------
function getRandomPrice(): number {
    // Random price between 50 lakhs and 5 crores (converted to INR in lakhs)
    const priceInCrores = Math.random() * (5 - 0.5) + 0.5;
    return Math.floor(priceInCrores * 100); // Return price in lakhs
}

// -------------------------------
// 🌱 Seed Function
// -------------------------------
async function seed() {
    try {
        // Clear existing data from all collections
        for (const key in COLLECTIONS) {
            const collectionId = COLLECTIONS[key as keyof typeof COLLECTIONS];
            const documents = await databases.listDocuments(
                config.databaseId!,
                collectionId!,
            );
            for (const doc of documents.documents) {
                await databases.deleteDocument(
                    config.databaseId!,
                    collectionId!,
                    doc.$id,
                );
            }
        }

        console.log("Cleared all existing data.");

        // Seed Agents
        const agents: Models.Document[] = [];
        for (let i = 1; i <= 5; i++) {
            const agent = await databases.createDocument(
                config.databaseId!,
                COLLECTIONS.AGENT!,
                ID.unique(),
                {
                    name: `Agent ${i}`,
                    email: `agent${i}@example.com`,
                    avatar: agentImages[
                        Math.floor(Math.random() * agentImages.length)
                    ],
                },
            );
            agents.push(agent);
        }
        console.log(`Seeded ${agents.length} agents.`);

        // Seed Reviews
        const reviews: Models.Document[] = [];
        for (let i = 1; i <= 20; i++) {
            const review = await databases.createDocument(
                config.databaseId!,
                COLLECTIONS.REVIEWS!,
                ID.unique(),
                {
                    name: `Reviewer ${i}`,
                    avatar: reviewImages[
                        Math.floor(Math.random() * reviewImages.length)
                    ],
                    review: `This is a review by Reviewer ${i}.`,
                    rating: Math.floor(Math.random() * 5) + 1,
                },
            );
            reviews.push(review);
        }
        console.log(`Seeded ${reviews.length} reviews.`);

        // Seed Galleries
        const galleries: Models.Document[] = [];
        for (const image of galleryImages) {
            const gallery = await databases.createDocument(
                config.databaseId!,
                COLLECTIONS.GALLERY!,
                ID.unique(),
                { image },
            );
            galleries.push(gallery);
        }
        console.log(`Seeded ${galleries.length} galleries.`);

        // Seed Properties
        for (let i = 1; i <= 50; i++) {
            const assignedAgent =
                agents[Math.floor(Math.random() * agents.length)];
            const assignedReviews = getRandomSubset(reviews, 5, 7);
            const assignedGalleries = getRandomSubset(galleries, 3, 8);

            const propertyName =
                indianPropertyNames[
                    Math.floor(Math.random() * indianPropertyNames.length)
                ];
            const city =
                indianCities[Math.floor(Math.random() * indianCities.length)];
            const location = `${Math.floor(Math.random() * 200 + 1)} ${propertyName} Road, ${city}`;

            const image =
                propertiesImages[
                    Math.floor(Math.random() * propertiesImages.length)
                ];

            const property: PropertyDocument = await databases.createDocument(
                config.databaseId!,
                COLLECTIONS.PROPERTY!,
                ID.unique(),
                {
                    name: propertyName,
                    type: propertyTypes[
                        Math.floor(Math.random() * propertyTypes.length)
                    ],
                    description: `Welcome to ${propertyName}, a beautiful property located in the heart of ${city}. Experience luxury living with modern amenities.`,
                    address: location,
                    geolocation: `192.168.1.${i}`,
                    price: getRandomPrice(),
                    area: Math.floor(Math.random() * 3000) + 500,
                    bedrooms: Math.floor(Math.random() * 5) + 1,
                    bathrooms: Math.floor(Math.random() * 5) + 1,
                    rating: Math.floor(Math.random() * 5) + 1,
                    facilities: getRandomSubset(facilities, 3, 6),
                    image: image,
                    agent: assignedAgent.$id,
                    reviews: assignedReviews.map((review) => review.$id),
                    gallery: assignedGalleries.map((gallery) => gallery.$id),
                },
            );

            console.log(`Seeded property: ${property.name}`);
        }

        console.log("Data seeding completed.");
    } catch (error) {
        console.error("Error seeding data:", error);
    }
}

export default seed;
