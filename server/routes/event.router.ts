import express from "express";
import pool from "../modules/pool";

const router: express.Router = express.Router();

/* route to GET all events */
router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction): void => {
	const queryText: string = `SELECT * FROM "events"`;
	pool.query(queryText)
		.then((response) => {
			res.send(response.rows)
		})
		.catch((err) => {
			console.log(`Error retrieving all events: ${err}`);
			res.sendStatus(500);
		});
});

/* route to pull up information about a selected event */
router.get('/:id', (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    const eventId: number | null = <number>Number(req.params.id);

    const queryText: string = `SELECT "id", "eventTitle", "eventDate", "eventLocation", "startTime" FROM "events"
    WHERE "id" = $1
    ORDER BY "startTime" ASC;`;

    pool.query(queryText [eventId])
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            console.log(`Error getting specific event: ${err}`);
            res.sendStatus(500);
        }) 
});

/* route to POST a new event in the calendar */
router.post('/', (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    const eventTitle: string | null = <string>req.body.eventTitle;
    const notes: string | null = <string>req.body.notes;
    const location: string | null = <string>req.body.location;
    const eventDate: number | null = <number>req.body.eventDate;
    const startTime: number | null = <number>req.body.startTime;
    const endTime: number | null = <number>req.body.endTime;
    const endEventDate: number | null = <number>req.body.endEventDate;

	const queryText: string = `INSERT INTO "events" ("eventDate", "startTime", "endTime", "endEventDate", "eventTitle", "notes", "location") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
	pool.query(queryText, [eventDate, startTime, endTime, endEventDate, eventTitle, eventTitle, notes, location])
		.then(() => res.sendStatus(201))
		.catch(err => {
			console.log(`Error POSTing new event: ${err}`);
			res.sendStatus(500);
		});
});

export default router;