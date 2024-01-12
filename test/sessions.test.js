
import { app } from "../src/app.js";
import supertest from "supertest";
import { expect } from "chai";

const requester = supertest(app);

describe("Sessions - Pruebas", function() {
    it("El endpoint POST /api/sessions registra una nueva cuenta", async function() {
        const user = {
            first_name: "Pablo",
            last_name: "Perez",
            email: "pperez@gmail.com",
            age: 25,
            password: "asd405520"
        };
        
        const response = await requester.post("/api/sessions/user-login").send(user);

        expect(response.body).to.have.property("_id");
    });
});