import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// ck editor
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

// redux store
import { createTask } from '../../../../store/actions/taskActions';

const ModalCreateTask = ({setModalCreate}) => {
    const [title, setTitle] = useState('');
    const [instruction, setInstruction] = useState('');
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    
    const handleTitleChange = e => {
        setError(false)
        setTitle(e.target.value)
    }
    
    const handleInstructionChange = data => {
        setError(false)
        setInstruction(data)
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(title === null || title === undefined || title === '' || instruction === null || instruction === undefined || instruction === '') {
            setError(true);
            return          
        }
        dispatch(createTask(title, instruction));
        setTitle('');
        setInstruction('');
        setModalCreate(false)
        setError(false)
    }

    return (
        <div className="modal createtask">
            <div className="modal_con">
                <div className="modal_div">
                    <div className="modal_close" onClick={() => setModalCreate(false)}>
                        <span>x</span>
                    </div>
                    <div className="modal_body">
                        <h3>Create a new task</h3>
                        <form onSubmit={e => handleSubmit(e)}>
                            <label htmlFor="title">
                                Title: * { error && <span>Please input required (*) fields.</span> }
                                <input name="title" type="text" value={title} onChange={e => handleTitleChange(e)} placeholder="Task title..." />
                            </label>
                            <label htmlFor="instruction">
                                Instructions: *
                                {/* <textarea name="instruction" type="text" value={instruction} onChange={e => setInstruction(e.target.value)} placeholder="Task instructions..."></textarea> */}
                                <CKEditor
                                    onInit={ editor => {
                                        // Insert the toolbar before the editable area.
                                        editor.ui.getEditableElement().parentElement.insertBefore(
                                            editor.ui.view.toolbar.element,
                                            editor.ui.getEditableElement()
                                        );
                                    } }
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        handleInstructionChange(data)
                                    }}
                                    editor={ DecoupledEditor }
                                    config={
                                        {
                                            toolbar: {
                                                items: [
                                                    // 'heading', '|',
                                                    'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', 'insertTable', '|',
                                                    'alignment', 'link', 'blockQuote', '|',
                                                    'bulletedList', 'numberedList', '|',
                                                    'outdent', 'indent', '|', 
                                                    'undo', 'redo'
                                                ]
                                            },
                                            fontFamily: {
                                                options: [
                                                    'default',
                                                    'Arial, Helvetica, sans-serif',
                                                    'Calibri',
                                                    'Carrois Gothic SC, sans-serif',
                                                    'Courier New, Courier, monospace',
                                                    'Tahoma, Geneva, sans-serif',
                                                    'Trebuchet MS, Helvetica, sans-serif'
                                                ]
                                            },
                                            link: {
                                                decorators: {
                                                    openInNewTab: {
                                                        mode: 'manual',
                                                        label: 'Open in a new tab',
                                                        attributes: {
                                                            target: '_blank',
                                                            rel: 'noopener noreferrer'
                                                        }
                                                    }
                                                }
                                            },
                                            indentBlock: { offset: 0.5, unit: 'em' },
                                            typing: {
                                                transformations: {
                                                    remove: [
                                                        // Do not use the transformations from the
                                                        // 'symbols' and 'quotes' groups.
                                                        'symbols',
                                                        'quotes',
                                    
                                                        // As well as the following transformations.
                                                        'arrowLeft',
                                                        'arrowRight'
                                                    ],
                                    
                                                    extra: [
                                                        // Add some custom transformations – e.g. for emojis.
                                                        { from: ':)', to: '🙂' },
                                                        { from: ':y:', to: '👍' },
                                                        { from: ':tada:', to: '🎉' },
                                    
                                                        // You can also define patterns using regular expressions.
                                                        // Note: The pattern must end with `$` and all its fragments must be wrapped
                                                        // with capturing groups.
                                                        // The following rule replaces ` "foo"` with ` «foo»`.
                                                        {
                                                            from: /(^|\s)(")([^"]*)(")$/,
                                                            to: [ null, '«', null, '»' ]
                                                        },
                                    
                                                        // Finally, you can define `to` as a callback.
                                                        // This (naive) rule will auto-capitalize the first word after a period.
                                                        {
                                                            from: /(\. )([a-z])$/,
                                                            to: matches => [ null, matches[ 1 ].toUpperCase() ]
                                                        }
                                                    ]
                                                }
                                            },
                                            placeholder: 'Type the instructions here!'
                                        }
                                    }
                                />
                            </label>
                            <input type="submit" value="Create Task" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalCreateTask
