import React, { Dispatch, ReactElement, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUsersFromApi } from '../redux/actions/userAction';
import { User } from '../redux/types';
import { UserCard } from './userCard';
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from './loader';
import * as PropTypes from 'prop-types';
import { IRootReducer } from '../redux/reducers/rootReducer';

interface StateProps {
    users: User[]
    isLoading: boolean
    per_page: number
    page: number
    totalCount?: number
    totalPages?: number
}

interface DispatchProps {
    populate: (pageNo: number) => void
}

export type Props = StateProps & DispatchProps;

export const UsersList: React.FunctionComponent<Props> = ({ populate, isLoading, users, page, per_page, totalPages }): ReactElement => {

    const [userList, setUserList] = useState<User[]>([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setTimeout(() => populate(1), 3000);
    }, [populate])

    useEffect(() => {
        if (page === totalPages) {
            setHasMore(false)
        }
    }, [page, totalPages])

    useEffect(() => {
        const allUsers = userList.concat(users);
        setUserList(allUsers);
    }, [users])

    return (
        <>
            {isLoading ?
                <Loader />
                : <>
                    <div className={'header'}>
                        <header>Users</header>
                    </div>
                    <InfiniteScroll
                        dataLength={per_page}
                        next={() => populate(page + 1)}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>no more users</b>
                            </p>
                        }
                    >
                        {
                            userList.map((user: User) => (
                                <UserCard key={user.first_name + user.id} user={user} />
                            ))
                        }
                    </InfiniteScroll>
                </>}
        </>
    )
}

function mapStateToProps({ users }: IRootReducer): StateProps {
    return {
        isLoading: users.isLoading,
        users: users?.users ? users?.users : [],
        per_page: users?.per_page ? users?.per_page : 0,
        page: users?.page ? users?.page : 0,
        totalCount: users?.totalCount,
        totalPages: users?.totalPages
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    return {
        populate: (pageNo: number) => dispatch(getUsersFromApi(pageNo))
    };
}

UsersList.propTypes = {
    populate: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            email: PropTypes.string.isRequired,
            first_name: PropTypes.string.isRequired,
            last_name: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired
        }).isRequired,
    ).isRequired,
    page: PropTypes.number.isRequired,
    per_page: PropTypes.number.isRequired,
    totalPages: PropTypes.number
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);