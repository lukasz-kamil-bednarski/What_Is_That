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
        const STR_MAP =Converter.swap ({'Faces': 0,
            'accordion': 1,
            'barrel': 2,
            'binocular': 3,
            'buddha': 4,
            'butterfly': 5,
            'camera': 6,
            'cougar_body': 7,
            'cougar_face': 8,
            'crab': 9,
            'crayfish': 10,
            'crocodile': 11,
            'dalmatian': 12,
            'scissors': 13,
            'soccer_ball': 14,
            'stegosaurus': 15,
            'stop_sign': 16,
            'strawberry': 17,
            'sunflower': 18,
            'tick': 19,
            'trilobite': 20,
            'umbrella': 21,
            'watch': 22});

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

  }


}