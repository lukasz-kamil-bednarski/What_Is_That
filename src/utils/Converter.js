export default class Converter {
    /**
     * @deprecated
     * @param results -> array with 0's and (hopefully) 1.
     * @returns {*}
     */
  static resultsToStr=(results)=>{
        let winningIndex = results.indexOf(1);
        let str;
        switch (winningIndex) {
            case 0:
                str = "Human face";
                break;
            case 1:
                str = "Butterfly";
                break;
            case 2:
                str = "Cougar body";
                break;
            case 3:
                str = "Cougar face";
                break;
            case 4:
                str = "Crab";
                break;
            case 5:
                str = "Crayfish";
                break;
            case 6:
                str = "Crocodile";
                break;
            case 7:
                str = "Soccer ball";
                break;
            default:
                str = "Not recognized";
                break;
        }
        return str;
    };

    /**
     *
     * @param data
     * @returns {Array}
     */
  static convertToArray = (data) => {
        let outputArray = [];
        data.forEach((num)=>{
            outputArray.push(num)
        });
        return outputArray;
    };
    /**
     * Mapping indexes to str values
     * @param array
     * @returns {*}
     */
  static mapToStr = (array) =>{
        const STR_MAP =Converter.swap (
            {'Faces': 0,
                'Leopards': 1,
                'accordion': 2,
                'barrel': 3,
                'binocular': 4,
                'buddha': 5,
                'butterfly': 6,
                'camera': 7,
                'cougar_body': 8,
                'cougar_face': 9,
                'crab': 10,
                'crayfish': 11,
                'crocodile': 12,
                'dalmatian': 13,
                'grand_piano': 14,
                'hawksbill': 15,
                'headphone': 16,
                'hedgehog': 17,
                'helicopter': 18,
                'ibis': 19,
                'inline_skate': 20,
                'joshua_tree': 21,
                'ketch': 22,
                'lamp': 23,
                'laptop': 24,
                'menorah': 25,
                'metronome': 26,
                'minaret': 27,
                'pigeon': 28,
                'pizza': 29,
                'scissors': 30,
                'soccer_ball': 31,
                'stegosaurus': 32,
                'stop_sign': 33,
                'strawberry': 34,
                'sunflower': 35,
                'tick': 36,
                'trilobite': 37,
                'umbrella': 38,
                'watch': 39}
        );

        let max = Math.max(...array);
      let winningIndex = array.indexOf(max);

      return STR_MAP[winningIndex];
  };

  static swap = (obj) =>{

      let swapped_obj = {};

      for (let prop in obj) {
          if(obj.hasOwnProperty(prop)) {
              swapped_obj[obj[prop]] = prop;
          }
      }
      return swapped_obj;

  };

  static getPropNames = () =>{
      const obj = {'Faces': 0,
          'Leopards': 1,
          'accordion': 2,
          'barrel': 3,
          'binocular': 4,
          'buddha': 5,
          'butterfly': 6,
          'camera': 7,
          'cougar_body': 8,
          'cougar_face': 9,
          'crab': 10,
          'crayfish': 11,
          'crocodile': 12,
          'dalmatian': 13,
          'grand_piano': 14,
          'hawksbill': 15,
          'headphone': 16,
          'hedgehog': 17,
          'helicopter': 18,
          'ibis': 19,
          'inline_skate': 20,
          'joshua_tree': 21,
          'ketch': 22,
          'lamp': 23,
          'laptop': 24,
          'menorah': 25,
          'metronome': 26,
          'minaret': 27,
          'pigeon': 28,
          'pizza': 29,
          'scissors': 30,
          'soccer_ball': 31,
          'stegosaurus': 32,
          'stop_sign': 33,
          'strawberry': 34,
          'sunflower': 35,
          'tick': 36,
          'trilobite': 37,
          'umbrella': 38,
          'watch': 39};
      let list = [];
      for(let prop in obj){
          list.push(prop)
      }
      return list;
  };
  static findMaxProp(array){
      let max = Math.max(...array);
      return array.indexOf(max);
  }


}