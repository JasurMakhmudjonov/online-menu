const prisma = require('../utils/connection');

module.exports = {
    restaurants: async () => {
        return await prisma.restaurants.findMany({
            select: {
                id: true,
                name: true,
                address: true,
                foods: true
            }
        });
    },
    restaurant: async ({ id }) => {
        const restaurant = await prisma.restaurants.findUnique({
            where: { id }, select: {
                id: true,
                name: true,
                address: true,
                foods: true
            }
        });
        if (!restaurant) {
            throw new Error(`Restaurant with id ${id} not found`);
        }
        return restaurant;
    },
    foods: async () => await prisma.foods.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            restaurantId: true,
            restaurant: true
        }
    }),
    food: async ({ id }) => {
        const food = await prisma.foods.findUnique({
            where: { id }, select: {
                id: true,
                name: true,
                price: true,
                restaurantId: true,
                restaurant: true
            }
        });
        if (!food) {
            throw new Error(`Food with id ${id} not found`);
        }
        return food;
    },
    createRestaurant: async ({ name, address }) => {
        try {
            const newRestaurant = await prisma.restaurants.create({
                data: {
                    name,
                    address,
                }, select: {
                    id: true,
                    name: true,
                    address: true,
                    foods: true
                }
            });
            return newRestaurant;
        } catch (err) {
            throw new Error('Failed to create restaurant');
        }
    },
    updateRestaurant: async ({ id, name, address }) => {

        return await prisma.restaurants.update({
            where: { id },
            data: {
                name,
                address,
            }, select: {
                id: true,
                name: true,
                address: true,
                foods: true
            }
        });
    },
    deleteRestaurant: async ({ id }) => {
        await prisma.restaurants.delete({ where: { id } });
        return `Restaurant with id ${id} deleted`;
    },
    createFood: async ({ name, price, restaurantId }) => {

        return await prisma.foods.create({
            data: {
                name,
                price,
                restaurantId,

            }, select: {
                id: true,
                name: true,
                price: true,
                restaurantId: true,
                restaurant: true
            }
        });
    },
    updateFood: async ({ id, name, price, restaurantId }) => {

        return await prisma.foods.update({
            where: { id },
            data: {
                name,
                price,
                restaurantId,
            }, select: {
                id: true,
                name: true,
                price: true,
                restaurantId: true,
                restaurant: true
            }
        });
    },
    deleteFood: async ({ id }) => {
        await prisma.foods.delete({ where: { id } });
        return `Food with id ${id} deleted`;
    },
};
