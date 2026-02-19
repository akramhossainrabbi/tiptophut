export const parseLaravelName = (jsonName) => {
    try {
        const parsed = JSON.parse(jsonName);
        if (typeof parsed === 'object') {
            return Object.values(parsed)[0]; // Return first localization value
        }
        return jsonName;
    } catch (e) {
        return jsonName;
    }
};