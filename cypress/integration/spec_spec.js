describe('Main page', () => {
  it('should login and do stuff', () => {
    cy.login();
    cy.request({
      method: 'POST',
      url: 'https://tkbs.odtuteknokent.com.tr/Employee/GetListAttend',
      body: {
        'draw': 1,
        'columns[0][data]': 'CompanyName',
        'columns[0][name]': '',
        'columns[0][searchable]': true,
        'columns[0][orderable]': true,
        'columns[0][search][value]': '',
        'columns[0][search][regex]': false,
        'columns[1][data]': 'Device',
        'columns[1][name]': '',
        'columns[1][searchable]': true,
        'columns[1][orderable]': true,
        'columns[1][search][value]': '',
        'columns[1][search][regex]': false,
        'columns[2][data]': 'ReadingDate',
        'columns[2][name]': '',
        'columns[2][searchable]': true,
        'columns[2][orderable]': true,
        'columns[2][search][value]': '',
        'columns[2][search][regex]': false,
        'order[0][column]': 2,
        'order[0][dir]': 'desc',
        'start': 0,
        'length': 150,
        'search[value]': '',
        'search[regex]': false
      },
      form: true,
    }).then((response) => {

      // TODO Revisit iteration 1-2 for all time scan
      // Used for Iteration 1-2
      // const scans = response.body.data.map((scan) => {
      //   const epoch = Number(scan.ReadingDate.substr(6, scan.ReadingDate.length - 8));
      //   return new Date(epoch);
      // });

      // Used for Iteration 1
      // const weekdayScans = {};
      // const weekendScans = {};

      // Used for Iteration 2
      // const scanMap = {};

      // Iteration 1-2
      // scans.forEach((scan) => {
      //   const year = scan.getFullYear();
      //   const month = scan.getMonth() + 1;
      //   const day = scan.getDate();
      //
      //
      //   // Iteration 1 - Weekdays and weekends
      //   // const targetObj = scan.getDay() < 6 ? weekdayScans : weekendScans;
      //   // targetObj[year] = targetObj[year] || {};
      //   // targetObj[year][month] =  targetObj[year][month] ||  {};
      //   // targetObj[year][month][day] = targetObj[year][month][day] + 1 || 1;
      //
      //   // Iteration 2 - Single object with isWeekend
      //   // const isWeekend = scan.getDay() > 5;
      //   // scanMap[year] = scanMap[year] || {};
      //   // scanMap[year][month] = scanMap[year][month] || {};
      //   // if (!scanMap[year][month][day]) {
      //   //  scanMap[year][month][day] = {count:0, isWeekend};
      //   // } else {
      //   //   scanMap[year][month][day].count++;
      //   // }
      // });

      // Revision 3 for this month scan

      const scans = response.body.data.map((scan) => {
        const epoch = Number(scan.ReadingDate.substr(6, scan.ReadingDate.length - 8));
        return new Date(epoch).toDateString();
      });

      const now = new Date();
      let iterator = new Date(now.getFullYear(), now.getMonth(), 1);
      let output = '';

      for (; iterator.getDate() <= now.getDate(); iterator.setDate(iterator.getDate() + 1)) {
        const dateString = iterator.toDateString();
        const isWeekend = iterator.getUTCDay() > 4;
        const count = scans.reduce((acc, val) => dateString === val ? acc + 1 : acc, 0);

        if (!isWeekend && count < 2) {
          output += `Missing scan ${dateString}, Count: ${count}\n`;
        }

        if (isWeekend && count > 1) {
          output += `Weekend scan ${dateString}, Count: ${count}\n`;
        }
      }

      output = output ? output : 'Congratulations, you do not have any missing days!'
      cy.writeFile('logs/output.log', output).then((text) => {
        expect(text).to.exist;
      });
    });
  })
});

