export default class DataProvider {
    /**
     * Reading the position of a mouse
     * @param canvas
     * @param evt
     * @returns {{x: number, y: number}}
     */
   static getMousePos =(canvas, evt)=> {
        let rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    };
}