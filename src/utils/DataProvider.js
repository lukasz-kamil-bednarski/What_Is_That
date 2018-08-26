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

   static getDiscreteGraphWeight = () =>{
       let random = Math.random();
       if(random <= 0.15){
           return 0;
       }else if(0.85>random>0.15){
           return 2;
       }else{
           return 4;
       }
   };


   static getClasModelList = () =>{
       return   ["{'Faces': 0,\n" +
       " 'Leopards': 1,\n" +
       " 'accordion': 2,\n" +
       " 'barrel': 3,\n" +
       " 'binocular': 4,\n" +
       " 'buddha': 5,\n" +
       " 'butterfly': 6,\n" +
       " 'camera': 7,\n" +
       " 'cougar_body': 8,\n" +
       " 'cougar_face': 9,\n" +
       " 'crab': 10,\n" +
       " 'crayfish': 11,\n" +
       " 'crocodile': 12,\n" +
       " 'dalmatian': 13,\n" +
       " 'grand_piano': 14,\n" +
       " 'hawksbill': 15,\n" +
       " 'headphone': 16,\n" +
       " 'hedgehog': 17,\n" +
       " 'helicopter': 18,\n" +
       " 'ibis': 19,\n" +
       " 'inline_skate': 20,\n" +
       " 'joshua_tree': 21,\n" +
       " 'ketch': 22,\n" +
       " 'lamp': 23,\n" +
       " 'laptop': 24,\n" +
       " 'menorah': 25,\n" +
       " 'metronome': 26,\n" +
       " 'minaret': 27,\n" +
       " 'pigeon': 28,\n" +
       " 'pizza': 29,\n" +
       " 'scissors': 30,\n" +
       " 'soccer_ball': 31,\n" +
       " 'stegosaurus': 32,\n" +
       " 'stop_sign': 33,\n" +
       " 'strawberry': 34,\n" +
       " 'sunflower': 35,\n" +
       " 'tick': 36,\n" +
       " 'trilobite': 37,\n" +
       " 'umbrella': 38,\n" +
       " 'watch': 39}"]
   }
}