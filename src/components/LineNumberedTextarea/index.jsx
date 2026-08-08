import React, { useRef } from 'react';
import { Input, Textarea } from '@mantine/core';
import classes from './linenumberedtextarea.module.css';

const LineNumberedTextarea = ({
  label,
  placeholder,
  value,
  onChange,
  minRows,
  maxRows,
  highlights,
  autoFocus,
}) => {
  const gutterInnerRef = useRef(null);
  const highlightsInnerRef = useRef(null);
  const lineCount = value === '' ? 1 : value.split('\n').length;

  /**
   * Keep the line number gutter and the line highlights vertically aligned
   * with the textarea scroll position
   * @param event The event that triggered the scroll
   */
  const syncScroll = (event) => {
    const offset = `translateY(${-event.currentTarget.scrollTop}px)`;
    if (gutterInnerRef.current) {
      gutterInnerRef.current.style.transform = offset;
    }
    if (highlightsInnerRef.current) {
      highlightsInnerRef.current.style.transform = offset;
    }
  };

  return (
    <Input.Wrapper label={label}>
      <div className={classes.editor}>
        {highlights && (
          <div className={classes.highlights} aria-hidden="true">
            <div className={classes.highlightsInner} ref={highlightsInnerRef}>
              {Array.from({ length: lineCount }, (_, index) => (
                <div
                  key={index}
                  className={`${classes.row} ${
                    highlights[index] === 'added'
                      ? classes.added
                      : highlights[index] === 'removed'
                        ? classes.removed
                        : ''
                  }`}
                />
              ))}
            </div>
          </div>
        )}
        <div className={classes.gutter} aria-hidden="true">
          <div className={classes.gutterInner} ref={gutterInnerRef}>
            {Array.from({ length: lineCount }, (_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>
        </div>
        <Textarea
          variant="unstyled"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onScroll={syncScroll}
          autosize
          minRows={minRows}
          maxRows={maxRows}
          wrap="off"
          autoFocus={autoFocus}
          classNames={{ input: classes.input }}
        />
      </div>
    </Input.Wrapper>
  );
};

export default LineNumberedTextarea;
