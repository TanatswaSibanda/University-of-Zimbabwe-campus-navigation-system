
// src/services/favoriteRoutesService.js
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { getDeviceId } from "./deviceId";

// Save a favorite route for this device
export async function saveFavoriteRoute(userId, routeData) {
    const deviceId = getDeviceId();

    try {
        const docRef = await addDoc(collection(db, "deviceFavorites"), {
            deviceId: deviceId,
            userId: userId,
            startBuilding: routeData.startBuilding || "Current Location",
            destinationBuilding: routeData.destinationBuilding,
            destinationVenue: routeData.destinationVenue || null,
            savedAt: new Date().toISOString()
        });
        console.log("Route saved to Firebase!");
        return docRef.id;
    } catch (error) {
        console.error("Error saving route:", error);
        return null;
    }
}

// Load all favorite routes for this device
export async function loadFavoriteRoutes(userId) {
    const deviceId = getDeviceId();

    try {
        const q = query(collection(db, "deviceFavorites"), where("deviceId", "==", deviceId));
        const querySnapshot = await getDocs(q);
        const routes = [];
        querySnapshot.forEach((doc) => {
            routes.push({ id: doc.id, ...doc.data() });
        });
        return routes.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
    } catch (error) {
        console.error("Error loading favorites:", error);
        return [];
    }
}

// Delete a favorite route
export async function deleteFavoriteRoute(routeId) {
    try {
        await deleteDoc(doc(db, "deviceFavorites", routeId));
        console.log("Route deleted!");
        return true;
    } catch (error) {
        console.error("Error deleting route:", error);
        return false;
    }
}