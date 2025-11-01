import connection from "../database/mysql.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
const Add_Team_Members = AsyncHandler(async (req, res) => {
    const Teamdata = req.body
    // console.log(data.members)
    const TeamName = Teamdata.teamName;
    const TeamMemberData = Teamdata.members;
    let leademail;
    const [result] = await connection.query(`insert into Team_List(NAME, SPOC_ID) VALUES ('${TeamName}', 2)`)
    console.log(result.insertId)
    for (let i = 0; i < TeamMemberData.length; i++){
        let singledata = TeamMemberData[i];
        // console.log(singledata)
        if (singledata.role == "Team Lead") {
            await connection.query(`UPDATE Team_List SET LEAD_EMAIL = '${singledata.email}' WHERE ID = ${result.insertId}`)
            await connection.query(`UPDATE Team_List SET LEAD_PHONE = '${singledata.phone}' WHERE ID = ${result.insertId}`)
            leademail = singledata.email
        }
        const [res] = await connection.query(`insert into Team_Members_List(ROLE, NAME, EMAIL, PHONE, GENDER, SPOC_ID, TEAM_ID) values ('${singledata.role}','${singledata.name}', '${singledata.email}', '${singledata.phone}', '${singledata.gender}', 2, ${result.insertId})`)

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, 
            auth: {
                user: "damodara2006@gmail.com",
                pass: process.env.DAMO_GMAIL_PASS,
            },
        });
        const email = async () => {
            const info = await transporter.sendMail({
                from: '"Sakthi Auto" <damodara2006@gmail.com>',
                to: `${singledata.email}`,
                subject: "You have registered for Sakthi-auto contest",
                // text: "You have registered for Sakthi-auto contest",
                html: `<b>You have successfully registered for contest in Sakthi-auto contest at ${new Date().getFullYear()} under the team head ${leademail}</b>`, 
            });

            console.log("Message sent:", info.messageId);
        }

        await email()
        // console.log(dev)
    }
    // console.log(data.members[0])


    res.send(`Team id : ${result.insertId}`)
    
})

export {Add_Team_Members}