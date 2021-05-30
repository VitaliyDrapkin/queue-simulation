export function removeCustomerByIndex(state, payload) {
  return {
    ...state,
    receptions: [...state.receptions].map((queue, index) => {
      if (index !== payload.queueIndex) {
        return queue;
      }
      const newQueue = { ...queue };
      newQueue.customersInQueue.splice(payload.customerInQueueIndex, 1);
      return newQueue;
    }),
  };
}
