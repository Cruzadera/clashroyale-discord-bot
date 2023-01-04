const axios = require('axios');
const { CLASH_TOKEN } = require('config');

axios.defaults.baseURL = 'https://api.clashroyale.com/v1/';
axios.defaults.headers.common['Authorization'] = `Bearer ${CLASH_TOKEN}`;

exports.generateTableCup = async() => {
    const result = {
        name: String,
        endedTime: Date,
        membersList: [],
    };
    const url = 'https://api.clashroyale.com/v1/tournaments/%232YUPC0U8';
    const config = {
        headers: {
            'Authorization': `Bearer ${CLASH_TOKEN}`,
        },
        method: 'get',
        url,
    };

    await axios(config).then(response => {
        if (response.status === 200) {
            result.name = response.data.name;
            result.endedTime = response.data.endedTime;
            response.data.membersList.forEach(member => {
                if (member.name !== 'CRUZADERA') {
                    result.membersList.push({ value: member.score + 1, name: member.name });
                }
            });
        }
    });
    return result;
};