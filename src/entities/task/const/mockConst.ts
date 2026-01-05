import {createTask} from "../model/createTask.ts";
import {createUser} from "entities/user";
import {ROLES} from "entities/role";

export const tasksMock = [
    createTask({
        id: 1,
        title: 'Task 2 Task 2 Task 2 Task 2 Task 2 Task 2 Task 2 T',
        description: 'Description of task 1 Description of task 2 Description of task 2',
        status: false,
        creator: createUser({
            id: 1,
            name: "User",
            email: "id1mail@email.ru",
            secondName: "Second",
            surname: "Last",
            username: "user1",
            role: ROLES.USER
        })
    }),
    createTask({
        id: 2,
        title: 'Task 1 Tas',
        description: 'Description of task 2 Descript',
        status: false,
        creator: createUser({
            id: 2,
            name: "Иван",
            email: "ivanov@email.ru",
            secondName: "Иванович",
            surname: "Иванов",
            username: "ivan_i",
            role: ROLES.USER
        })
    }),
    createTask({
        id: 3,
        title: 'WWWWWWWWWWWWWWWWWWWW',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. N',
        status: false,
        creator: createUser({
            id: 3,
            name: "WWWWWWWWWW",
            email: "admin@company.ru",
            secondName: "Админович",
            surname: "Главный",
            username: "super_admin",
            role: ROLES.ADMIN
        })
    })
];
