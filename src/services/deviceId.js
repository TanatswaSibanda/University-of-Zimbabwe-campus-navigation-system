// src/services/deviceId.js

export function getDeviceId() {
    let deviceId = localStorage.getItem('uz_navigation_device_id');

    if (!deviceId) {
        deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('uz_navigation_device_id', deviceId);
        console.log('New device ID created:', deviceId);
    }

    return deviceId;
}