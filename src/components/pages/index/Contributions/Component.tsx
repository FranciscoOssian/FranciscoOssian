import getContributions from "@/services/github/getContrubutions";

import './styles.scss'

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const currentMonth = new Date().getMonth();
const months = [
  ...monthNames.slice(currentMonth, 12),
  ...monthNames.slice(0, currentMonth + 1)
];

const Contributions = async () => {
  const contributions: any = await getContributions();

  return (
  <div id="scss-contributions-ssr-r">
    <div>
      {contributions.totalContributions} contributions in the last year
    </div>
    <div className="main">
      <div className="table-box">
      <table className="table">
        <thead className="thead">
          <tr>
            {months.map((month, index) => 
              <th colSpan={4} key={index}>{month}</th>
            )}
          </tr>
        </thead>
        <tbody className="tbody">
          {Array(7).fill(0).map((_, weekDay) => (
            <tr key={weekDay}>
              {contributions.weeks.map((week: any, index: number) => {
                const filtered = week.contributionDays.find((day: any) => day.weekday === weekDay);
                const level = getContributionLevel(
                  filtered?.contributionCount
                )
                const content = getContributionLabel(filtered)
                return <>
                  <td
                    key={index}
                    data-content={content}
                    data-level={level}
                    suppressHydrationWarning
                  />
                </>
              })}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div>
      <div className="legend" style={{fontSize: 12}}>
        <a href="https://docs.github.com/articles/why-are-my-contributions-not-showing-up-on-my-profile">
          Learn how github count contributions
        </a>
      </div>
      <div className="legend">
        Less
        <table className="table">
          <tbody className="tbody">
            <tr>
              {
                [0,1,2,3,4].map( i => (
                  <td
                    key={i}
                    data-level={i}
                  />
                ))
              }
            </tr>
          </tbody>
        </table>
        More
      </div>
      </div>
    </div>
  </div>);
}


function getContributionLevel(contributionCount: number) {
  if(!contributionCount) return 0;
  if (contributionCount === 0) {
    return 0;
  } else if (contributionCount >= 1 && contributionCount <= 3) {
    return 1;
  } else if (contributionCount >= 4 && contributionCount <= 6) {
    return 2;
  } else if (contributionCount >= 7 && contributionCount <= 9) {
    return 3;
  } else {
    return 4;
  }
}

function getContributionLabel(contribution: any) {
  if(!contribution) return JSON.stringify(contribution);
  let resp = Array(3);
  if(contribution.contributionCount === 0) resp[0] = 'No contribuitions'
  if(contribution.contributionCount === 1) resp[0] = '1 contribuition'
  if(contribution.contributionCount >= 2) resp[0] = `${contribution.contributionCount} contribuitions`

  resp[1] = ` on ${contribution.date}`

  return resp.join('');
}

export default Contributions