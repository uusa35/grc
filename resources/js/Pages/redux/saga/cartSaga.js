export function* startAddToCartScenario(action) {
    try {
        console.log('the action from start cart scenario', action);

    } catch (e) {
        console.log('e', e)
    } finally {

    }
}


export function* startRemoveFromCartScenario(action) {
    try {
        console.log('the remove', action);

    } catch (e) {
        console.log('e', e)
    } finally {

    }
}


export function* startClearCartScenario(action) {
    try {
        console.log('the clear', action);

    } catch (e) {
        console.log('e', e)
    } finally {

    }
}
