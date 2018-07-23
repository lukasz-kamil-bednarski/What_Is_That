export default class Converter {

    /**
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


  static convertToArray = (data) => {
        let outputArray = [];
        data.forEach((num)=>{
            outputArray.push(num)
        });
        return outputArray;
    };

}