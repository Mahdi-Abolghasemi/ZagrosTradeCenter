import { IAuth_Repository } from "../IRepositories/IAuth_Repository";
import { Auth_Model } from "../../Domain/Model/Auth_Model";
import objConnection from "../../dbConnection";
import { ReturnType_Enum } from "../../Domain/Enumration/ReturnType";
import { RoulType_Enum } from "../../Domain/Enumration/RoulType_Enum";

export class Auth_Repository implements IAuth_Repository<Auth_Model> {
    async Login(userName: string, hashPassword: string): Promise<Auth_Model> {
        let user: Auth_Model = <Auth_Model>{};
        try {
            const myDb = objConnection.GetDb();
            await myDb.collection("Users").findOne<Auth_Model>({ "email": userName, "password": hashPassword }).then(res => user = <Auth_Model>res);

            return user;
        }
        catch (ex: unknown) {
            console.error(`error in login is:  ${ex}`);
            return <Auth_Model>{};
        }
    }

    async Registration(profile: Auth_Model): Promise<boolean> {
        try {
            let result: boolean = false
            const myDb = objConnection.GetDb();
            await myDb.collection("Users").insertOne(profile).then(res => result = res.acknowledged);

            return result;
        }
        catch (ex: unknown) {
            console.log(`error in registration is:  ${ex}`);
            return false;
        }
    }

    async GetProfile(email: string, returnType: string): Promise<Auth_Model> {
        let user: Auth_Model = <Auth_Model>{}
        try {
            const myDb = objConnection.GetDb();

            switch (returnType) {
                case ReturnType_Enum.FullData:
                    await myDb.collection("Users").findOne<Auth_Model>({ "email": email, "role": RoulType_Enum.User }).then(res => user = <Auth_Model>res);
                    break;
                case ReturnType_Enum.CustomData:
                    await myDb.collection("Users").findOne<Auth_Model>({ "email": email, "role": RoulType_Enum.User }, { projection: { _id: 0, email: 1, firstName: 1, lastName: 1 } }).then(res => user = <Auth_Model>res);
                    break;
            }

            return user;
        }
        catch (ex: unknown) {
            console.error(`error in get profile: ${ex}`);
            return user;
        }
    }

    async EditProfile(profile: Auth_Model): Promise<boolean> {
        let result: boolean = false;
        try {
            const myDb = objConnection.GetDb();
            await myDb.collection("Users").updateOne({ "email": profile.email, "role": RoulType_Enum.User }, { $set: { "firstName": profile.firstName, "lastName": profile.lastName } }).then(res => result = res.acknowledged);

            return result;
        }
        catch (ex: unknown) {
            console.error(`error in edit profile: ${ex}`);
            return result;
        }
    }

    async ChangePassword(email: string, hashNewPass: string): Promise<boolean> {
        let result: boolean = false;
        try {
            const myDb = objConnection.GetDb();
            await myDb.collection("Users").updateOne({ "email": email, "role": RoulType_Enum.User }, { $set: { "password": hashNewPass } }).then(res => result = res.acknowledged);
            return result;
        }
        catch (ex: unknown) {
            console.error(`error in change password: ${ex}`);
            return result;
        }
    }

    async ChangeAdminPassword(email: string, hashNewPass: string): Promise<boolean> {
        let result: boolean = false;
        try {
            const myDb = objConnection.GetDb();
            await myDb.collection("Users").updateOne({ "email": email, "role": RoulType_Enum.Admin }, { $set: { "password": hashNewPass } }).then(res => result = res.acknowledged);
            return result;
        }
        catch (ex: unknown) {
            console.error(`error in change password: ${ex}`);
            return result;
        }
    }

    async GetAdminProfile(email: string, returnType: string): Promise<Auth_Model> {
        let user: Auth_Model = <Auth_Model>{}
        try {
            const myDb = objConnection.GetDb();

            switch (returnType) {
                case ReturnType_Enum.FullData:
                    await myDb.collection("Users").findOne<Auth_Model>({ "email": email, "role": RoulType_Enum.Admin }).then(res => user = <Auth_Model>res);
                    break;
                case ReturnType_Enum.CustomData:
                    await myDb.collection("Users").findOne<Auth_Model>({ "email": email, "role": RoulType_Enum.Admin }, { projection: { _id: 0, email: 1, firstName: 1, lastName: 1 } }).then(res => user = <Auth_Model>res);
                    break;
            }

            return user;
        }
        catch (ex: unknown) {
            console.error(`error in get profile: ${ex}`);
            return user;
        }
    }

    async EditAdminProfile(profile: Auth_Model): Promise<boolean> {
        let result: boolean = false;
        try {
            const myDb = objConnection.GetDb();
            await myDb.collection("Users").updateOne({ "email": profile.email, "role": RoulType_Enum.Admin }, { $set: { "firstName": profile.firstName, "lastName": profile.lastName } }).then(res => result = res.acknowledged);

            return result;
        }
        catch (ex: unknown) {
            console.error(`error in edit profile: ${ex}`);
            return result;
        }
    }
}