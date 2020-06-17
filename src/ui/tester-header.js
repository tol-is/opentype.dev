import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { css } from 'emotion';

import Slider from '../ui/input-range';
import { setTesterProp } from '../modules/tester';
import TextSamplesView from './text-samples';
import ButtonToggle from '../ui/btn-toggle';

import PanelFontLibrary from './panel-font-library';

const TesterHeader = ({ tester, setTesterProp, setOpenPanel }) => {
  const [showPanel, setShowPanel] = useState();

  useEffect(() => {
    setOpenPanel(showPanel);
  }, [showPanel]);

  const onFontSizeChange = useCallback((e) => {
    setTesterProp('fontSize', e.target.value);
  }, []);

  const onLineHeightChange = useCallback((e) => {
    setTesterProp('lineHeight', e.target.value);
  }, []);

  const onSampleTextChange = useCallback((value) => {
    setTesterProp('text', value);
  }, []);

  const onRightToLeftChange = useCallback((value) => {
    setTesterProp('rtl', value);
  }, []);

  const onToggleTextPanel = useCallback(() => {
    setShowPanel(showPanel === 'text' ? null : 'text');
  }, [showPanel]);

  const onToggleFontsPanel = useCallback(() => {
    setShowPanel(showPanel === 'fonts' ? null : 'fonts');
  }, [showPanel]);

  const hideAllPanels = useCallback(() => {
    // console.log('hide');
    setShowPanel(null);
  }, [showPanel]);

  const showTextPanel = useMemo(() => showPanel === 'text', [showPanel]);

  const showFontsLibrary = useMemo(() => showPanel === 'fonts', [showPanel]);

  //
  return (
    <>
      <header
        onMouseLeave={hideAllPanels}
        className={css`
          position: fixed;
          display: block;
          top: 0;
          width: 100%;
          z-index: 100;
          padding: 0 5vw;
          background-color: #060606;
        `}
      >
        <div
          className={css`
            padding: 0.5rem 0 0 0;
            display: grid;
            grid-template-columns: repeat(7, minmax(0, 1fr));
            grid-auto-rows: minmax(2em, auto);
            grid-gap: 1.5rem;
            width: 100%;
          `}
        >
          <div>
            <ButtonToggle
              selected={showFontsLibrary}
              aria-expanded={showFontsLibrary}
              aria-controls={`panel-fonts-library`}
              onClick={onToggleFontsPanel}
              label={'Fonts'}
            />
          </div>
          <div>
            <ButtonToggle
              selected={showTextPanel}
              aria-expanded={showTextPanel}
              aria-controls={`header-text-samples`}
              onClick={onToggleTextPanel}
              label={'Text Sample'}
            />
          </div>
          <div>
            <Slider
              label="Font Size"
              min={12}
              max={128}
              step={1}
              value={tester.global.fontSize}
              onChange={onFontSizeChange}
            />
          </div>
          <div>
            <Slider
              label="Line Height"
              min={1}
              max={2}
              step={0.01}
              value={tester.global.lineHeight}
              onChange={onLineHeightChange}
            />
          </div>
        </div>
        <div
          className={css`
            position: absolute;
            width: 100%;
            left: 0;
            top: 100%;
            padding: 0 5vw;
            background-color: #060606;
          `}
        >
          <TextSamplesView
            visible={showTextPanel}
            id={`header-text-samples`}
            tester={tester}
            onTextChange={onSampleTextChange}
            onRtlChange={onRightToLeftChange}
          />
          <PanelFontLibrary
            visible={showFontsLibrary}
            id={`panel-fonts-library`}
          />
        </div>
      </header>
    </>
  );
};

export default TesterHeader;
