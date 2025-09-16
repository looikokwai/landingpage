import React from 'react';
import Input from './Input'; // Reuse our custom Input component

const Textarea = React.forwardRef((props, ref) => (
    <Input
        multiline
        rows={4}
        ref={ref}
        {...props}
    />
));

export default Textarea;
