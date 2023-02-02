import app from "../src/index";
import supertest from "supertest";
import fruits from "data/fruits";

const api = supertest(app);

describe("GET FRUITS", () => {
    it("should respond with status 200 and a empty array when it doesnt have fruit", async () => {
        const response = await api.get("/fruits");
        //const fruta: 


        expect(response.status).toBe(200);

        expect(response.body).toEqual([]);

    })
})

describe("POST FRUITS", () => {

    it("should respond with status 201 if the insert fruit was sucessfull", async () => {

        const response = await api.post("/fruits").send({
            name: "banana",
            price: 2
        });

        expect(response.status).toBe(201)
    })

    it("should respond with status 409 if conflict", async () => {

        const response = await api.post("/fruits").send({
            name: "banana",
            price: 2
        });

        expect(response.status).toBe(409);
    })
})


describe("GET FRUITS", () => {

    it("should respond with status 200 if the query was sucessfull", async () => {
        const response = await api.get("/fruits");


        expect(response.status).toBe(200);

        expect(response.body).toEqual([{
            name: expect.any(String),
            price: expect.any(Number),
            id: expect.any(Number)
        }
        ])
    })
})

describe("GET FRUITS:ID", () => {

    it("should respond with status 200 if fruit doesnt exist", async () => {
        const response = await api.get("/fruits/2");

        expect(response.status).toBe(404);
    })

    it("should respond with status 200 if get a fruit by id", async () => {
        const response = await api.get("/fruits/1");

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            name: expect.any(String),
            price: expect.any(Number),
            id: expect.any(Number)
        }
        )
    })
})