import { rest } from 'msw'
import {URLS} from "../components/app/app"

export const handlers = [
    rest.get('/fake/:stuff/gurt', (req, res, context) => {
        const {stuff} = req.params
        console.log('fake' + stuff)
    }),

    rest.get('/frames/:pk/associates/', (req,res, ctx) => {
         return res(
            ctx.status(200),
            ctx.json({
                "arcs": [
                    {"id": 13, "creation_datetime": "2021-03-02T20:14:10.811557Z", "modification_datetime": "2021-03-02T20:14:10.811557Z", "source": 17791, "sense": 17739, "sink": 17743},
                    {"id": 14, "creation_datetime": "2021-03-03T03:44:02.472335Z", "modification_datetime": "2021-03-03T03:44:02.472335Z", "source": 17791, "sense": 17739, "sink": 17743},
                    {"id": 16, "creation_datetime": "2021-03-03T03:44:02.496655Z", "modification_datetime": "2021-03-03T03:44:02.496655Z", "source": 17791, "sense": 17916, "sink": 17921},
                    {"id": 15, "creation_datetime": "2021-03-03T03:44:02.492761Z", "modification_datetime": "2021-03-03T03:44:02.492761Z", "source": 17739, "sense": 17914, "sink": 17915},
                    {"id": 19, "creation_datetime": "2021-03-03T03:44:02.508244Z", "modification_datetime": "2021-03-03T03:44:02.508244Z", "source": 17743, "sense": 17920, "sink": 17923},
                    {"id": 17, "creation_datetime": "2021-03-03T03:44:02.500395Z", "modification_datetime": "2021-03-03T03:44:02.500395Z", "source": 17916, "sense": 17914, "sink": 17925},
                    {"id": 18, "creation_datetime": "2021-03-03T03:44:02.504327Z", "modification_datetime": "2021-03-03T03:44:02.504327Z", "source": 17916, "sense": 17918, "sink": 17922},
                    {"id": 20, "creation_datetime": "2021-03-03T03:44:02.512372Z", "modification_datetime": "2021-03-03T03:44:02.512372Z", "source": 17923, "sense": 17919, "sink": 17924}
                ],
                "node_frames": [
                    {"id": 17739, "name": "braaapp", "content": "lazer sound", "creation_datetime": "2021-02-20T00:55:48.702711Z", "modification_datetime": "2021-02-22T21:39:14.664256Z"},
                    {"id": 17743, "name": "fake", "content": "is fake", "creation_datetime": "2021-02-20T02:13:26.850846Z", "modification_datetime": "2021-02-22T21:39:28.676580Z"},
                    {"id": 17915, "name": "hard", "content": "with strong force", "creation_datetime": "2021-03-02T20:53:32.978569Z", "modification_datetime": "2021-03-02T20:53:32.978569Z"},
                    {"id": 17916, "name": "boop", "content": "to touch a creature's nose", "creation_datetime": "2021-03-02T20:53:32.980612Z", "modification_datetime": "2021-03-02T20:53:32.980612Z"},
                    {"id": 17919, "name": "have_part", "content": "to have a named portion of one's whole self", "creation_datetime": "2021-03-02T20:53:32.989634Z", "modification_datetime": "2021-03-02T20:53:32.989634Z"},
                    {"id": 17920, "name": "eat", "content": "to physically consume for digestion", "creation_datetime": "2021-03-02T20:53:32.991408Z", "modification_datetime": "2021-03-02T20:53:32.991408Z"},
                    {"id": 17921, "name": "garr", "content": "a person named garr", "creation_datetime": "2021-03-02T20:53:32.992925Z", "modification_datetime": "2021-03-02T20:53:32.992925Z"},
                    {"id": 17922, "name": "2", "content": "the integer one greater than one", "creation_datetime": "2021-03-02T20:53:32.995180Z", "modification_datetime": "2021-03-02T20:53:32.995180Z"},
                    {"id": 17923, "name": "chicken", "content": "a common flightless bird", "creation_datetime": "2021-03-02T20:53:32.996693Z", "modification_datetime": "2021-03-02T20:53:32.996693Z"},
                    {"id": 17924, "name": "feet", "content": "parts of legs, as hands are to arms", "creation_datetime": "2021-03-02T20:53:32.998422Z", "modification_datetime": "2021-03-02T20:53:32.998422Z"},
                    {"id": 17925, "name": "quiet", "content": "the quality of approximate silence", "creation_datetime": "2021-03-03T03:41:07.165000Z", "modification_datetime": "2021-03-03T03:41:07.165000Z"},
                    {"id": 17914, "name": "have_way", "content": "to have a quality of execution", "creation_datetime": "2021-03-02T20:53:32.972556Z", "modification_datetime": "2021-03-08T21:50:21.127935Z"},
                    {"id": 17791, "name": "newbleaasdf", "content": "this is bad", "creation_datetime": "2021-02-21T20:24:21.202076Z", "modification_datetime": "2021-03-08T21:50:45.026229Z"},
                    {"id": 17918, "name": "have_times", "content": "to have a quantity of executions, mister", "creation_datetime": "2021-03-02T20:53:32.988029Z", "modification_datetime": "2021-03-08T21:51:18.077266Z"}
                ]
            })
        )
    }),
]