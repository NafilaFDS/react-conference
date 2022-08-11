import { gql } from '@apollo/client'

export const CONFERENCES = gql`
  query {
    conferences{
      id
      name
      schedules{
        day
        description
        intervals{
          begin
          end
        }
      }
    }
}`
export const SINGLE_CONFERENCE = gql`
query conference(
  $id: ID!
){
    conference(
     id: $id
      ){
          id
          name
          slogan
          partners{
            name
            aboutShort
            company
            image{
              url
              title
            }
          }
          organizer{
            name
            aboutShort
            company
            image{
              url
              title
            }
          }
          locations{
            name
            about
            image{
              url
              title
            }
            country{
              name
            }
            city
            address
          }
          sponsors{
            name
            aboutShort
            company
            image{
              url
              title
            }
          }
          schedules{
            day
            description
        }
        speakers{
          name
          aboutShort
          company
          image{
            url
            title
          }
        }
      }
  }
`;