export interface Order {
    visit : {
        id? : any;
          },

    priceGross?: any;
    priceNet?: any;
    vat?: any;
    quantities?:any;
    totalAmount?: any
    description?: any;

    foodItem: {
        id?: any;
    },
   
}