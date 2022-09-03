export const categoryData = [
  {
    name: 'fast food',
    image: require('../assets/fastfood.png'),
    id: 1,
  },
  {
    name: 'Burger',
    image: require('../assets/burger.png'),
    id: 2,
  },
  {
    name: 'Salad',
    image: require('../assets/salad.png'),
    id: 3,
  },
  {
    name: 'Pizza',
    image: require('../assets/pizza.png'),
    id: 4,
  },
  {
    name: 'Drinks',
    image: require('../assets/drink.png'),
    id: 5,
  },
];

export const restaurantData = [
  {
    name: 'Mc Donalds',
    farAway: '21.2',
    Address: 'Street-2 Mukherjee Nagar',
    image: require('../assets/mcDonald.png'),
    averageRating: 4.9,
    totalReviews: 300,
    coordinates: {lat: -261888612, long: 28246325},
    discount: 10,
    deliveryTime: 20,
    collectTime: 10,
    foodType: 'Burgers,Wraps,Milkshakes....',
    productData: [
      {
        name: 'Mc Puff',
        price: 45,
        image: '',
      },
      {
        name: 'Mc Chicken',
        price: 155,
        image: '',
      },
    ],
    id: 1,
  },
  {
    name: 'Fasos',
    farAway: '10.2',
    Address: 'Street-6 Adarsh Nagar',
    image: require('../assets/fasos.png'),
    averageRating: 4.8,
    totalReviews: 400,
    coordinates: {lat: -261888612, long: 28246325},
    discount: 15,
    deliveryTime: 25,
    collectTime: 10,
    foodType: 'Burgers,Wraps,Meals....',
    productData: [
      {
        name: 'Veg Special Wrap',
        price: 145,
        image: '',
      },
      {
        name: 'Shawarma Roll',
        price: 255,
        image: '',
      },
    ],
    id: 2,
  },
];
