const { PrismaClient } = require("@prisma/client");
const products = require("./products.json");
const prisma = new PrismaClient();

const main = async () => {
	for (const product of products) {
		await prisma.product.create({
			data: product,
		});
	}
};

(async () => {
	try {
		await main();
		await prisma.$disconnect();
	} catch (error) {
		console.log(error);
		await prisma.$disconnect();
		process.exit(1);
	}
})();
