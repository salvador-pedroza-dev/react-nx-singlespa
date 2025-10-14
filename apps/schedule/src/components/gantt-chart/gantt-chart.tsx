import { Bar, Row } from '@/types';
import styles from './gantt-chart.module.scss';
import moment from 'moment';

interface Props {
  headers: string[];
  subHeaders: string[];
  columnSize: number;
  colUnits: number;
  data: Row[];
  startDate?: moment.Moment;
  endDate?: moment.Moment;
}

export function GanttChart({ headers, subHeaders, columnSize, colUnits, data, startDate }: Props) {
  const gantSize = subHeaders.length * columnSize * headers.length + columnSize / 2;

  const tableSize = subHeaders.length * columnSize * headers.length;
  const numColumns = subHeaders.length * headers.length;
  const colUnit = columnSize / colUnits;
  const totalUnits = numColumns * colUnits;
  const renderedItems = [];

  const lineStyle = { width: `${columnSize + 'px'}` };
  const headerDateStyle = { width: `${tableSize}px` };
  const ganttHeaderStyle = { width: `${gantSize}px` };
  const placeholderStyle = { width: `${columnSize / 2}px` };
  const timeStyle = { width: `${columnSize}px` };
  const ganttTableStyle = { width: `${gantSize}px` };

  for (let i = 0; i < numColumns; i++) {
    renderedItems.push(<div className={styles['line']} key={i} style={lineStyle}></div>);
  }

  const tableRowStyle = {
    gridTemplateColumns: `repeat(${totalUnits}, ${colUnit + 'px'}) ${columnSize + 'px'}`,
  };

  const getPosition = (bar: Bar, type: 'start' | 'end') => {
    if (bar[type] !== undefined) {
      return bar[type];
    }

    let date: moment.Moment;

    if (type === 'start') {
      date = moment(bar.startDate);
    } else {
      date = moment(bar.endDate);
    }

    const hoursDiff = date.diff(startDate, 'hours') || 0;
    bar[type] = hoursDiff;
    return hoursDiff;
  };

  return (
    <section className={styles['gantt-chart']}>
      <div className={styles['gantt-chart__pivot-column']}>
        <div className={styles['pivot-column__header']}></div>
        <div className={styles['pivot-column__header']}></div>
        {data.map((row, index) => (
          <div className={styles['pivot-row']} key={`row-${index}`}>
            <span>{row.label}</span>
          </div>
        ))}
      </div>
      <div className={styles['gantt-chart__body']}>
        <div className={styles['gantt-chart__header-date']} style={headerDateStyle}>
          {headers.map((date, index) => (
            <div className={styles['date']} key={`date-${index}`}>
              {date}
            </div>
          ))}
        </div>
        <div className={styles['gantt-chart__header']} style={ganttHeaderStyle}>
          <div className={styles['placeholder']} style={placeholderStyle}></div>
          {headers.map((index) =>
            subHeaders.map((subHeader, subIndex) => (
              <div className={styles['time']} key={`time-${index}-${subIndex}`} style={timeStyle}>
                {subHeader}
              </div>
            ))
          )}
        </div>
        <div className={styles['gantt-chart__table']} style={ganttTableStyle}>
          <div className={styles['table-lines']}>{renderedItems}</div>
          {data.map((row, index) => (
            <div className={styles['table-row']} style={tableRowStyle} key={`row-${index}`}>
              {row.bars.map((bar, barIndex) => (
                <div
                  className={`${styles['bar']} bg-secondary`}
                  key={`bar-${barIndex}`}
                  style={{
                    gridColumn: `${getPosition(bar, 'start') * colUnits + 1} / ${getPosition(bar, 'end') * colUnits + 1}`,
                  }}
                  onClick={() => {
                    console.log(bar);
                  }}
                >
                  {bar.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
