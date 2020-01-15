import React from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

//styles
import {
  column,
  columns,
  isNarrow,
  listCard,
  gridCard,
  eventDescription,
  event_details,
  event_image,
  descriptionUnderline,
} from './styles/EventListCard.module.scss'

/* 
The cards shown on the EventList component.
Changing the class names on the Link element
sets the style to List format or Grid format
 */
export default function EventListCard(props) {
  const {item} = props

  return (
    <Link
      className={props.useListView ? `${listCard}  ${columns}` : gridCard}
      to={`events/${item.id}`}
    >
      <img
        src={item.event_images[0].url}
        className={(column, isNarrow, event_image)}
      />
      <div className={`${column} ${event_details}`}>
        <p
          data-id='event_location'
          className=' is-size-7 is-uppercase has-text-weight-bold color_chalice'
        >
          {(item.locations && item.locations[0].neighborhood) || 'North End'}
        </p>
        <p
          data-id='event_title'
          data-testid='event_title'
          className='is-size-5 has-text-weight-bold color_black'
        >
          {item.title}
        </p>
        <p className='is-size-6'>
          <span data-id='event_time' className='color_chalice'>
            {`${moment(item.start).format('h:mm a')} - ${moment(
              item.end,
            ).format('h:mm a')}`}
          </span>
          &nbsp;
          <span>&#8226;</span>
          &nbsp;
          <span className='color_chalice'>Free</span>
          &nbsp;
          {item.locations[0].distanceFromUser && (
            <span className='color_shark'>
              {`Distance: ${item.locations[0].distanceFromUser.toFixed(2)} ${
                item.locations[0].distanceUnit === 'miles' ? 'mi' : 'km'
              }`}
            </span>
          )}
        </p>
        <p
          data-id='event_description'
          data-testid='event_description'
          className={`${eventDescription} is-size-7 color_black is-hidden-mobile`}
        >
          {item.description}
        </p>
        <div className={descriptionUnderline}></div>
      </div>
    </Link>
  )
}

EventListCard.propTypes = {
  item: PropTypes.object,
  useListView: PropTypes.bool,
}
