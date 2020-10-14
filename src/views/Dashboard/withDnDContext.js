import React, { Component } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Planning from './Planning';

class withDnDContext extends Component {
    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <Planning />
            </DndProvider>
        );
    }
}

export default withDnDContext;
