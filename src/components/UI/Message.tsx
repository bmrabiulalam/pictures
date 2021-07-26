interface MessageType {
    msg: string;
    type: 'danger' | 'success';
}

export default function Message({msg, type}: MessageType) {
    let typeClass = '';

    if(type === 'danger') typeClass = 'is-danger';
    
    if(type === 'success') typeClass = 'is-success';

    return (
        <article className={`message ${typeClass}`}>
            <div className="message-body">{msg}</div>
        </article>
    )
}
