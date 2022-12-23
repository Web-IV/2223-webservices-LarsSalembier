const { withServer } = require("../helpers/server");
const { tables } = require("../../src/data");

const data = {
  leaders: [
    {
      id: 1,
      person_id: 1,
      groupId: 1,
      yearId: 1,
    },
    {
      id: 2,
      personId: 1,
      groupId: 1,
      yearId: 1,
    },
    {
      id: 3,
      personId: 1,
      groupId: 1,
      yearId: 1,
    },
    {
      id: 4,
      personId: 1,
      groupId: 1,
      yearId: 1,
    },
    {
      id: 5,
      personId: 1,
      groupId: 1,
      yearId: 1,
    },
  ],
  people: [
    {
      id: 1,
      first_name: "Emma",
      last_name: "Smith",
      cellphone: "0497 63 21 49",
      address_id: 1,
    },
  ],
  addresses: [
    {
      id: 1,
      street: "Opvoedingstraat",
      number: "129",
      city: "Gent",
      zip: 9000,
    },
  ],
  groups: [
    {
      id: 1,
      name: "Glimlachende Geitjes",
      color: "roze",
      mascot_name: "Geitje-Gary",
      target_audience: "eerste t.e.m. tweede kleuter",
    },
  ],
  years: [
    {
      id: 1,
      start_date: new Date(2019, 8, 1),
      end_date: new Date(2020, 7, 31),
    },
  ],
};

const dataToDelete = {
  leaders: [1, 2, 3, 4, 5],
  people: [1],
  addresses: [1],
  groups: [1],
};

describe("Leader API", () => {
  let request;
  let knex;

  withServer(({ request: r, knex: k }) => {
    request = r;
    knex = k;
  });

  afterAll(async () => {
    await server.stop();
  });

  const url = "/api/leaders";

  describe("GET /api/leaders", () => {
    beforeAll(async () => {
      await knex(tables.leader).insert(data.leaders);
    });

    afterAll(async () => {
      await knex(tables.leader).whereIn("id", dataToDelete.leaders).del();
    });

    it("should return all leaders and 200", async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.count).toBeGreaterThanOrEqual(5);
    });
  });

  describe("GET /api/leaders/:id", () => {
    beforeAll(async () => {
      await knex(tables.address).insert(data.addresses[0]);
      await knex(tables.person).insert(data.people[0]);
      await knex(tables.group).insert(data.groups[0]);
      await knex(tables.year).insert(data.years[0]);
      await knex(tables.leader).insert(data.leaders[0]);
    });

    afterAll(async () => {
      await knex(tables.leader)
        .where("id", dataToDelete.leaders[0].id)
        .delete();
      await knex(tables.year).where("id", dataToDelete.years[0].id).delete();
      await knex(tables.group)
        .where("id", dataToDelete.groups[0].id)

        .delete();
      await knex(tables.person).where("id", dataToDelete.people[0].id).delete();
      await knex(tables.address).where("id", dataToDelete.addresses[0].id);
    });

    it("should 200 and return the leader with the given id", async () => {
      const response = await request.get(`${url}/${data.leaders[0].id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: data.leaders[0].id,
        person: {
          id: data.people[0].id,
          firstName: data.people[0].first_name,
          lastName: data.people[0].last_name,
          cellphone: data.people[0].cellphone,
          address: {
            id: data.addresses[0].id,
            street: data.addresses[0].street,
            number: data.addresses[0].number,
            city: data.addresses[0].city,
            zip: data.addresses[0].zip,
          },
        },
        group: {
          id: data.groups[0].id,
          name: data.groups[0].name,
          color: data.groups[0].color,
          mascotName: data.groups[0].mascot_name,
          targetAudience: data.groups[0].target_audience,
        },
        year: {
          id: data.years[0].id,
          startDate: data.years[0].start_date,
          endDate: data.years[0].end_date,
        },
      });
    });

    // it("should 404 when the leader does not exist", async () => {
    //   const response = await request.get(`${url}/999`);
    //   expect(response.status).toBe(404);
    // });

    // it("should 400 when the id is not a number", async () => {
    //   const response = await request.get(`${url}/abc`);
    //   expect(response.status).toBe(400);
    // });
  });

  describe("POST /api/leaders", () => {
    beforeAll(async () => {
      await knex(tables.address).insert(data.addresses[0]);
      await knex(tables.person).insert(data.people[0]);
      await knex(tables.group).insert(data.groups[0]);
      await knex(tables.year).insert(data.years[0]);
    });

    afterAll(async () => {
      await knex(tables.leader)
        .where("id", dataToDelete.leaders[0].id)
        .delete();
      await knex(tables.year).where("id", dataToDelete.years[0].id).delete();
      await knex(tables.group)
        .where("id", dataToDelete.groups[0].id)

        .delete();
      await knex(tables.person).where("id", dataToDelete.people[0].id).delete();
      await knex(tables.address).where("id", dataToDelete.addresses[0].id);
    });

    it("should 201 and return the created leader", async () => {
      const response = await request.post(url).send({
        personId: data.people[0].id,
        groupId: data.groups[0].id,
        yearId: data.years[0].id,
      });
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: expect.any(Number),
        person: {
          id: data.people[0].id,
          firstName: data.people[0].first_name,
          lastName: data.people[0].last_name,
          cellphone: data.people[0].cellphone,
          address: {
            id: data.addresses[0].id,
            street: data.addresses[0].street,
            number: data.addresses[0].number,
            city: data.addresses[0].city,
            zip: data.addresses[0].zip,
          },
        },
        group: {
          id: data.groups[0].id,
          name: data.groups[0].name,
          color: data.groups[0].color,
          mascotName: data.groups[0].mascot_name,
          targetAudience: data.groups[0].target_audience,
        },
        year: {
          id: data.years[0].id,
          startDate: data.years[0].start_date,
          endDate: data.years[0].end_date,
        },
      });
    });

    it("should 400 when the personId is not a number", async () => {
      const response = await request.post(url).send({
        personId: "abc",
        groupId: data.groups[0].id,
        yearId: data.years[0].id,
      });
      expect(response.status).toBe(400);
    });

    it("should 400 when the groupId is not a number", async () => {
      const response = await request.post(url).send({
        personId: data.people[0].id,
        groupId: "abc",
        yearId: data.years[0].id,
      });
      expect(response.status).toBe(400);
    });

    it("should 400 when the yearId is not a number", async () => {
      const response = await request.post(url).send({
        personId: data.people[0].id,
        groupId: data.groups[0].id,
        yearId: "abc",
      });
      expect(response.status).toBe(400);
    });

    it("should 400 when the personId is not a valid id", async () => {
      const response = await request.post(url).send({
        personId: 999,
        groupId: data.groups[0].id,
        yearId: data.years[0].id,
      });
      expect(response.status).toBe(400);
    });

    it("should 400 when the groupId is not a valid id", async () => {
      const response = await request.post(url).send({
        personId: data.people[0].id,
        groupId: 999,
        yearId: data.years[0].id,
      });
      expect(response.status).toBe(400);
    });

    it("should 400 when the yearId is not a valid id", async () => {
      const response = await request.post(url).send({
        personId: data.people[0].id,
        groupId: data.groups[0].id,
        yearId: 999,
      });
      expect(response.status).toBe(400);
    });
  });

  describe("PUT /api/leaders/:id", () => {
    beforeAll(async () => {
      await knex(tables.address).insert(data.addresses[0]);
      await knex(tables.person).insert(data.people[0]);
      await knex(tables.group).insert(data.groups[0]);
      await knex(tables.year).insert(data.years[0]);
      await knex(tables.leader).insert(data.leaders[0]);
    });

    afterAll(async () => {
      await knex(tables.leader)
        .where("id", dataToDelete.leaders[0].id)
        .delete();
      await knex(tables.year).where("id", dataToDelete.years[0].id).delete();
      await knex(tables.group).where("id", dataToDelete.groups[0].id).delete();
      await knex(tables.person).where("id", dataToDelete.people[0].id).delete();
      await knex(tables.address).where("id", dataToDelete.addresses[0].id);
    });

    it("should 200 and return the updated leader", async () => {
      const response = await request.put(`${url}/${data.leaders[0].id}`).send({
        personId: data.people[0].id,
        groupId: data.groups[0].id,
        yearId: data.years[0].id,
      });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: data.leaders[0].id,
        person: {
          id: data.people[0].id,
          firstName: data.people[0].first_name,
          lastName: data.people[0].last_name,
          cellphone: data.people[0].cellphone,
          address: {
            id: data.addresses[0].id,
            street: data.addresses[0].street,
            number: data.addresses[0].number,
            city: data.addresses[0].city,
            zip: data.addresses[0].zip,
          },
        },
        group: {
          id: data.groups[0].id,
          name: data.groups[0].name,
          color: data.groups[0].color,
          mascotName: data.groups[0].mascot_name,
          targetAudience: data.groups[0].target_audience,
        },
        year: {
          id: data.years[0].id,
          startDate: data.years[0].start_date,
          endDate: data.years[0].end_date,
        },
      });
    });

    it("should 400 when the personId is not a number", async () => {
      const response = await request.put(`${url}/${data.leaders[0].id}`).send({
        personId: "abc",
        groupId: data.groups[0].id,
        yearId: data.years[0].id,
      });
      expect(response.status).toBe(400);
    });

    it("should 400 when the groupId is not a number", async () => {
      const response = await request.put(`${url}/${data.leaders[0].id}`).send({
        personId: data.people[0].id,
        groupId: "abc",
        yearId: data.years[0].id,
      });
      expect(response.status).toBe(400);
    });

    it("should 400 when the yearId is not a number", async () => {
      const response = await request.put(`${url}/${data.leaders[0].id}`).send({
        personId: data.people[0].id,
        groupId: data.groups[0].id,
        yearId: "abc",
      });
      expect(response.status).toBe(400);
    });

    it("should 400 when the personId is not a valid id", async () => {
      const response = await request.put(`${url}/${data.leaders[0].id}`).send({
        personId: 999,
        groupId: data.groups[0].id,
        yearId: data.years[0].id,
      });
      expect(response.status).toBe(400);
    });

    it("should 400 when the groupId is not a valid id", async () => {
      const response = await request.put(`${url}/${data.leaders[0].id}`).send({
        personId: data.people[0].id,
        groupId: 999,
        yearId: data.years[0].id,
      });
      expect(response.status).toBe(400);
    });

    it("should 400 when the yearId is not a valid id", async () => {
      const response = await request.put(`${url}/${data.leaders[0].id}`).send({
        personId: data.people[0].id,
        groupId: data.groups[0].id,
        yearId: 999,
      });
      expect(response.status).toBe(400);
    });

    it("should 404 when the leader does not exist", async () => {
      const response = await request.put(`${url}/999`).send({
        personId: data.people[0].id,
        groupId: data.groups[0].id,
        yearId: data.years[0].id,
      });
      expect(response.status).toBe(404);
    });
  });
});
