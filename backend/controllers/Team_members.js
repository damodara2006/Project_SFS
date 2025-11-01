import connection from "../database/mysql.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const Add_Team_Members = AsyncHandler(async (req, res) => {
    const Teamdata = req.body
    // console.log(data.members)
    const TeamName = Teamdata.teamName;
    const TeamMemberData = Teamdata.members;

    const [result] = await connection.query(`insert into Team_List(NAME, SPOC_ID) VALUES ('${TeamName}', 2)`)
    console.log(result.insertId)
    for (let i = 0; i < TeamMemberData.length; i++){
        let singledata = TeamMemberData[i];
        // console.log(singledata)
        const [res] = await connection.query(`insert into Team_Members_List(ROLE, NAME, EMAIL, PHONE, GENDER, SPOC_ID, TEAM_ID) values ('${singledata.role}','${singledata.name}', '${singledata.email}', '${singledata.phone}', '${singledata.gender}', 2, ${result.insertId})`)
        // console.log(dev)
    }
    // console.log(data.members[0])
    res.send("Team id",result.insertId)
    
})

export {Add_Team_Members}