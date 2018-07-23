export default class StyleManager {
    static arrowStyleHandle = (condition) => {
        if (!condition) {
            return {animation: 'shake 3s infinite cubic-bezier(.36,.07,.19,.97) both'}
        }
        return null;
    };
}