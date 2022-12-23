const { withServer } = require("../helpers/server");
const { tables } = require("../../src/data");

const data = {
  addresses: [
    {
      id: 1,
      street: "Opvoedingstraat",
      number: "129",
      city: "Gent",
      zip: 9000,
    },
    {
      id: 2,
      street: "Leopoldstraat",
      number: "4b",
      city: "Antwerp",
      zip: 2000,
    },
    {
      id: 3,
      street: "Koningin Astridplein",
      number: "128 (20)",
      city: "Brussels",
      zip: 1000,
    },
    {
      id: 4,
      street: "Rue de la Loi",
      number: "131",
      city: "Luxembourg",
      zip: 1332,
    },
    {
      id: 5,
      street: "Via del Corso",
      number: "132",
      city: "Rome",
      zip: 186,
    },
  ],
};

const dataToDelete = {
  addresses: [1, 2, 3, 4, 5],
};

describe("Address REST API", () => {
  let request;
  let knex;

  withServer(({ request: r, knex: k }) => {
    request = r;
    knex = k;
  });

  const url = "/api/addresses";

  describe("GET /api/addresses", () => {
    beforeAll(async () => {
      await knex(tables.address).insert(data.addresses);
    });

    afterAll(async () => {
      await knex(tables.address).whereIn("id", dataToDelete.addresses).del();
    });

    test("it should 200 and return all addresses", async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.count).toBeGreaterThanOrEqual(5);
      expect(response.body.data.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe("GET /api/addresses/:id", () => {
    beforeAll(async () => {
      await knex(tables.address).insert(data.addresses[0]);
    });

    afterAll(async () => {
      await knex(tables.address)
        .where("id", dataToDelete.addresses[0].id)
        .delete();
    });

    test("it should 200 and return the address with the given id", async () => {
      const response = await request.get(`${url}/${data.addresses[0].id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(data.addresses[0]);
    });

    // test("it should 404 if the address with the given id does not exist", async () => {
    //   const response = await request.get(`${url}/999`);
    //   expect(response.status).toBe(404);
    // });

    // test("it should 400 if the id is not a number", async () => {
    //   const response = await request.get(`${url}/abc`);
    //   expect(response.status).toBe(400);
    // });
  });

  describe("POST /api/addresses", () => {
    const addressesToDelete = [];

    afterAll(async () => {
      await knex(tables.address).whereIn("id", addressesToDelete).delete();
    });

    test("it should 201 and return the created address", async () => {
      const response = await request.post(url).send({
        street: "ABCstraat",
        number: "1000",
        city: "Kaapstad",
        zip: 1234,
      });
      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
      expect(response.body.street).toBe("ABCstraat");
      expect(response.body.number).toBe("1000");
      expect(response.body.city).toBe("Kaapstad");
      expect(response.body.zip).toBe(1234);

      addressesToDelete.push(response.body.id);
    });

    // test("it should 400 if the request body is invalid", async () => {
    //   const response = await request.post(url).send({});
    //   expect(response.status).toBe(400);
    // });

    // test("it should 400 if the street is missing", async () => {
    //   const response = await request.post(url).send({
    //     number: "1000",
    //     city: "Kaapstad",
    //     zip: 1234,
    //   });
    //   expect(response.status).toBe(400);
    // });

    // test("it should 400 if the number is missing", async () => {
    //   const response = await request.post(url).send({
    //     street: "ABCstraat",
    //     city: "Kaapstad",
    //     zip: 1234,
    //   });
    //   expect(response.status).toBe(400);
    // });

    // test("it should 400 if the city is missing", async () => {
    //   const response = await request.post(url).send({
    //     street: "ABCstraat",
    //     number: "1000",
    //     zip: 1234,
    //   });
    //   expect(response.status).toBe(400);
    // });

    // test("it should 400 if the zip is missing", async () => {
    //   const response = await request.post(url).send({
    //     street: "ABCstraat",
    //     number: "1000",
    //     city: "Kaapstad",
    //   });
    //   expect(response.status).toBe(400);
    // });

    // test("it should 400 if the zip is not a number", async () => {
    //   const response = await request.post(url).send({
    //     street: "ABCstraat",
    //     number: "1000",
    //     city: "Kaapstad",
    //     zip: "1234",
    //   });
    //   expect(response.status).toBe(400);
    // });

    // test("it should 400 if the zip is not a positive number", async () => {
    //   const response = await request.post(url).send({
    //     street: "ABCstraat",
    //     number: "1000",
    //     city: "Kaapstad",
    //     zip: -1234,
    //   });
    //   expect(response.status).toBe(400);
    // });

    // test("it should 400 if the zip is not an integer", async () => {
    //   const response = await request.post(url).send({
    //     street: "ABCstraat",
    //     number: "1000",
    //     city: "Kaapstad",
    //     zip: 1234.5,
    //   });
    //   expect(response.status).toBe(400);
    // });
  });

  describe("PUT /api/addresses/:id", () => {
    beforeAll(async () => {
      await knex(tables.address).insert(data.addresses);
    });

    afterAll(async () => {
      await knex(tables.address).whereIn("id", dataToDelete.addresses).del();
    });

    test("it should 200 and return the updated address", async () => {
      const response = await request
        .put(`${url}/${data.addresses[0].id}`)
        .send({
          street: "Opvoedingstraat",
          number: "129",
          city: "Gent",
          zip: 9000,
        });
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(data.addresses[0].id);
      expect(response.body.street).toBe("Opvoedingstraat");
      expect(response.body.number).toBe("129");
      expect(response.body.city).toBe("Gent");
      expect(response.body.zip).toBe(9000);
    });

    // test("it should 400 if the request body is invalid", async () => {
    //   const response = await request.put(`${url}/${data.addresses[0].id}`).send({});
    //   expect(response.status).toBe(400);
    // });

    // test("it should 400 if the street is missing", async () => {
    //   const response = await request
    //     .put(`${url}/${data.addresses[0].id}`)
    //     .send({
    //       number: "129",
    //       city: "Gent",
    //       zip: 9000,
    //     });
    //   expect(response.status).toBe(400);
    // });

    // test("it should 400 if the number is missing", async () => {
    //   const response = await request
    //     .put(`${url}/${data.addresses[0].id}`)
    //     .send({
    //       street: "Opvoedingstraat",
    //       city: "Gent",
    //       zip: 9000,
    //     });
    //   expect(response.status).toBe(400);
    // });

    // test("it should 400 if the city is missing", async () => {
    //   const response = await request
    //     .put(`${url}/${data.addresses[0].id}`)
    //     .send({
    //       street: "Opvoedingstraat",
    //       number: "129",
    //       zip: 9000,
    //     });
    //   expect(response.status).toBe(400);
    // });

    // test("it should 400 if the zip is missing", async () => {
    //   const response = await request
    //     .put(`${url}/${data.addresses[0].id}`)
    //     .send({
    //       street: "Opvoedingstraat",
    //       number: "129",
    //       city: "Gent",
    //     });
    //   expect(response.status).toBe(400);
    // });

    // test("it should 400 if the zip is not a number", async () => {
    //   const response = await request
    //     .put(`${url}/${data.addresses[0].id}`)
    //     .send({
    //       street: "Opvoedingstraat",
    //       number: "129",
    //       city: "Gent",
    //       zip: "9000",
    //     });
    //   expect(response.status).toBe(400);
    // });

    // test("it should 400 if the zip is not a positive number", async () => {
    //   const response = await request
    //     .put(`${url}/${data.addresses[0].id}`)
    //     .send({
    //       street: "Opvoedingstraat",
    //       number: "129",
    //       city: "Gent",
    //       zip: -9000,
    //     });
    //   expect(response.status).toBe(400);
    // });

    // test("it should 400 if the zip is not an integer", async () => {
    //   const response = await request
    //     .put(`${url}/${data.addresses[0].id}`)
    //     .send({
    //       street: "Opvoedingstraat",
    //       number: "129",
    //       city: "Gent",
    //       zip: 9000.5,
    //     });
    //   expect(response.status).toBe(400);
    // });

    // test("it should 404 if the address with the given id does not exist", async () => {
    //   const response = await request.put(`${url}/999`).send({
    //     street: "Opvoedingstraat",
    //     number: "129",
    //     city: "Gent",
    //     zip: 9000,
    //   });
    //   expect(response.status).toBe(404);
    // });

    describe("DELETE /api/addresses/:id", () => {
      beforeAll(async () => {
        await knex(tables.address).insert(data.addresses[0]);
      });

      test("it should 204 and return nothing", async () => {
        const response = await request.delete(`${url}/${data.addresses[0].id}`);
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
      });

      // test("it should 404 if the address with the given id does not exist", async () => {
      //   const response = await request.delete(`${url}/999`);
      //   expect(response.status).toBe(404);
      // });

      // test("it should 400 if the address with the given id is still in use", async () => {
      //   const response = await request.delete(`${url}/1`);
      //   expect(response.status).toBe(400);
      // });
    });
  });
});
