//reducer: push the components(product in to basket). in other words it's a action of transforming same information in to some other page

export const initialState = {
    basket: [],
    user: null,
}

//selector
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            console.log(action, state)
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
            break;
        case "EMPTY_BASKET":
            return {
               ...state,
               basket:[]
            }
        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
            let newBasket = [...state.basket]
            if (index >= 0) {
                newBasket.splice(index, 1)

            } else {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in basket`
                )
            }
            return {
                ...state,
                basket: newBasket
            };

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };

        default:
            return state;
    }
};

export default reducer;