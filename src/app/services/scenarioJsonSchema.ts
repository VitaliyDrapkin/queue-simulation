export const scenarioSchema = {
  type: "object",
  properties: {
    ingredients: {
      type: "array",
      items: [
        {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            name: {
              type: "string",
            },
            delayTime: {
              type: "integer",
            },
          },
          required: ["id", "name", "delayTime"],
        },
      ],
    },
    products: {
      type: "array",
      items: [
        {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            productName: {
              type: "string",
            },
            image: {
              type: "string",
            },
            ingredients: {
              type: "array",
              items: [
                {
                  type: "integer",
                },
              ],
            },
          },
          required: ["id", "productName", "image", "ingredients"],
        },
      ],
    },
    customers: {
      type: "array",
      items: [
        {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            order: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                },
                products: {
                  type: "array",
                  items: [
                    {
                      type: "integer",
                    },
                  ],
                },
              },
              required: ["id", "products"],
            },
          },
          required: ["id", "order"],
        },
      ],
    },
    newCustomerFrequency: {
      type: "integer",
    },
    receptionTypes: {
      type: "array",
      items: [
        {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            getOrderTime: {
              type: "integer",
            },
          },
          required: ["getOrderTime"],
        },
      ],
    },
    receptions: {
      type: "array",
      items: [
        {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            receptionTypeId: {
              type: "integer",
            },
          },
          required: ["id", "receptionTypeId"],
        },
      ],
    },
    workplaces: {
      type: "integer",
    },
    delivers: {
      type: "integer",
    },
  },
  required: [
    "ingredients",
    "products",
    "customers",
    "newCustomerFrequency",
    "receptionTypes",
    "receptions",
    "workplaces",
    "delivers",
  ],
};
