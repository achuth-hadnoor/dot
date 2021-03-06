import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import styled from 'styled-components';
import spaces from './spaces'
import SpacesList from '../components/workspace/SpacesList'; 
// list of worspaces and global search on the Top
class Workspaces extends React.Component {

    componentDidMount() {
        /*
             1) show list of spaces 
             2) select first space data into redux or from /:sid
             3) switch space data into redux
        */ 
    }
    render() {
        return (
            <Wrapper>
                <Container>
                    <SpacesList workspace={this.props.selectedWorkspace} />
                    <Switch>
                        <Route component={spaces} path={["/:wid/:sid", "/:wid/:sid/:cid"]} />
                    </Switch>
                </Container>
            </Wrapper>
        )
    }
}

const mapStateToProps = (state, ownprops) => {
    debugger
    if (state.spaces && state.workspaces) { 
        let selectedSpace = state.workspaces[0].selected_space || null;
        if (selectedSpace && state.spaces && ownprops.match.params.sid && state.spaces[ownprops.match.params.sid]) {
            selectedSpace = ownprops.match.params.sid;
        }
        return {
            ...ownprops,
            user: state.user,
            workspace: state.workspaces[ownprops.match.params.wid],
            selectedWorkspace: ownprops.match.params.wid,
            spaces: state.spaces,
            selectedSpace: selectedSpace
        };
    }
    else {
        return { ...ownprops, user: state.user, workspaces: state.workspaces, spaces: state.spaces, selectedWorkspace: ownprops.match.params.wid, }
    }
}

const Wrapper = styled.div`
    display:flex;
    flex:1;
    height:100%;
`

const Container = styled.div`
    display:flex;
    flex-direction:column;
    flex:1;
    height:100%;
`

export default connect(mapStateToProps)(Workspaces)