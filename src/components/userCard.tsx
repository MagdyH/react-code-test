
import React, { ReactElement } from 'react';
import { User } from '../redux/types';
import * as PropTypes from 'prop-types';

interface StateProps {
    user: User
}

export type Props = StateProps;

export const UserCard: React.FunctionComponent<Props> = ({ user }): ReactElement => {

    return (
        <div className={'card'}>
            <img alt={''} src={user.avatar} />
            <p className={'user_name'}>{user.first_name + ' ' + user.last_name}</p>
        </div>
    )
}

UserCard.propTypes = {
    user: PropTypes.shape({
            id: PropTypes.number.isRequired,
            email:  PropTypes.string.isRequired,
            first_name:  PropTypes.string.isRequired,
            last_name:  PropTypes.string.isRequired,
            avatar:  PropTypes.string.isRequired
        }).isRequired
  }

export default UserCard;