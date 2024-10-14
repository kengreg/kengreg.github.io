import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const EventsGrid = ({
  currentEvent,
  useLocal = false,
  givenData = [],
  btnText = null,
}) => {
  const [eventsGrid, setEventsGrid] = useState([]);

  useEffect(() => {
    if (useLocal) {
      setEventsGrid(givenData);
    } else {
      const fetchData = async () => {
        try {
          const [dataEvents] = await Promise.all([
            axios.get(`https://spheremystica.com/data/events/eventsData.json`),
          ]);
          setEventsGrid(dataEvents.data.events);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, []);

  return (
    <section className="eventsGrid-container w-full">
      <article className="w-full eventsGrid-inner">
        <h4 className="eventsGrid-title font-bold fs-16px fs-sm-16px fs-md-17px fs-lg-18px">
          その他のイベント
        </h4>
        <ul className="w-full eventsGrid-content grid margin-auto">
          {eventsGrid.map(
            (eventgrid, index) =>
              currentEvent !== eventgrid.eventCode && (
                <li key={index}>
                  <figure className="event-card w-full clearfix">
                    <img src={eventgrid.imageUrl} alt={eventgrid.eventName} />
                    <figcaption className="w-full">
                      <h6 className="font-bold fs-15px fs-sm-15px fs-md-16px fs-lg-16px">
                        {eventgrid.eventName}
                      </h6>
                      <div
                        className="eventsGrid-description w-full text-overflow fs-12px fs-sm-12px fs-md-13px fs-lg-13px"
                        dangerouslySetInnerHTML={{
                          __html: eventgrid.description,
                        }}
                      ></div>
                      <button className="btn btn-link">
                        <a
                          href={eventgrid.link}
                          target="_blank"
                          className="fs-14px fs-sm-14px fs-md-15px fs-lg-15px font-bold"
                        >
                          {btnText ? btnText : "詳細情報"}
                        </a>
                      </button>
                    </figcaption>
                  </figure>
                </li>
              )
          )}
        </ul>
      </article>
    </section>
  );
};

export default EventsGrid;
