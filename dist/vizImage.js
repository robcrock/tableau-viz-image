/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Wrap everything in an anonymous function to avoid polluting the global namespace
(async () => {
    class VizImage {
        // Avoid globals.
        constructor(_$) {
            this._$ = _$;
        }
        /**
         * Initializes the extension
         */
        async initialize() {
            console.log('Waiting for DOM ready');
            await this._$.ready;
            console.log('Initializing extension API');
            await tableau.extensions.initializeAsync();
            await this.addVizImage(tableau.MarkType.Bar, 'tableau20_10_0');
            const markSelector = this._$('#mark-select');
            const colorSelector = this._$('#color-select');
            markSelector.prop('disabled', false);
            colorSelector.prop('disabled', false);
            // updating viz images with new values upon a selector change
            markSelector.change(() => {
                this.addVizImage(markSelector.val(), colorSelector.val());
            });
            colorSelector.change(() => {
                this.addVizImage(markSelector.val(), colorSelector.val());
            });
        }
        /**
         * Builds the input specifications and displays the created viz image
         * @param markType
         * @param colorPalette
         */
        async addVizImage(markType, palette) {
            // Building the input specification object that is used to create the viz image
            // Data values used in the viz image are prefilled
            const vizInputSpec = {
                data: {
                    values: [
                        { Product: 'Paper', Sales: 28, Region: 'Central' },
                        { Product: 'Pens', Sales: 45, Region: 'East' },
                        { Product: 'Rulers', Sales: 35, Region: 'East' },
                        { Product: 'Rulers', Sales: 43, Region: 'South' },
                        { Product: 'Paper', Sales: 50, Region: 'West' },
                        { Product: 'Pens', Sales: 56, Region: 'West' }
                    ]
                },
                description: 'A sample viz',
                encoding: {
                    color: { field: 'Product', type: tableau.VizImageEncodingType.Discrete, palette },
                    columns: { field: 'Region', type: tableau.VizImageEncodingType.Discrete },
                    rows: { field: 'Sales', type: tableau.VizImageEncodingType.Continuous }
                },
                mark: markType,
                markcolor: '#FFED5F',
                size: { width: 400, height: 300 }
            };
            // defaulting values if null
            if (markType === null) {
                vizInputSpec.mark = tableau.MarkType.Bar;
            }
            if (palette === null) {
                vizInputSpec.encoding.color.palette = 'tableau20_10_0';
            }
            const svg = await tableau.extensions.createVizImageAsync(vizInputSpec);
            // making call to create viz image from the input specifications
            const blob = new Blob([svg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const image = document.createElement('img');
            image.src = url;
            image.style.maxWidth = '100%';
            image.style.maxHeight = '100%';
            image.className = 'center-block';
            const vizApiElement = document.getElementById('viz-container');
            // clearing UI and adding in new viz
            vizApiElement.innerHTML = '';
            vizApiElement.appendChild(image);
            image.addEventListener('load', () => URL.revokeObjectURL(url), { once: true });
        }
    }
    console.log('Initializing VizImage extension.');
    await new VizImage($).initialize();
})();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vU2FtcGxlcy1UeXBlc2NyaXB0L1ZpekltYWdlL3ZpekltYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7O0FDaEZBLG1GQUFtRjtBQUNuRixDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ1YsTUFBTSxRQUFRO1FBQ1osaUJBQWlCO1FBQ2pCLFlBQW9CLEVBQWdCO1lBQWhCLE9BQUUsR0FBRixFQUFFLENBQWM7UUFBSSxDQUFDO1FBRXpDOztXQUVHO1FBQ0ksS0FBSyxDQUFDLFVBQVU7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFD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LCJmaWxlIjoidml6SW1hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG4iLCJpbXBvcnQgeyBNYXJrVHlwZSB9IGZyb20gJ0B0YWJsZWF1L2V4dGVuc2lvbnMtYXBpLXR5cGVzJztcblxuLy8gV3JhcCBldmVyeXRoaW5nIGluIGFuIGFub255bW91cyBmdW5jdGlvbiB0byBhdm9pZCBwb2xsdXRpbmcgdGhlIGdsb2JhbCBuYW1lc3BhY2Vcbihhc3luYyAoKSA9PiB7XG4gIGNsYXNzIFZpekltYWdlIHtcbiAgICAvLyBBdm9pZCBnbG9iYWxzLlxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgXyQ6IEpRdWVyeVN0YXRpYykgeyB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgZXh0ZW5zaW9uXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGluaXRpYWxpemUoKSB7XG4gICAgICBjb25zb2xlLmxvZygnV2FpdGluZyBmb3IgRE9NIHJlYWR5Jyk7XG4gICAgICBhd2FpdCB0aGlzLl8kLnJlYWR5O1xuICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBleHRlbnNpb24gQVBJJyk7XG4gICAgICBhd2FpdCB0YWJsZWF1LmV4dGVuc2lvbnMuaW5pdGlhbGl6ZUFzeW5jKCk7XG5cbiAgICAgIGF3YWl0IHRoaXMuYWRkVml6SW1hZ2UodGFibGVhdS5NYXJrVHlwZS5CYXIsICd0YWJsZWF1MjBfMTBfMCcpO1xuXG4gICAgICBjb25zdCBtYXJrU2VsZWN0b3IgPSB0aGlzLl8kKCcjbWFyay1zZWxlY3QnKTtcbiAgICAgIGNvbnN0IGNvbG9yU2VsZWN0b3IgPSB0aGlzLl8kKCcjY29sb3Itc2VsZWN0Jyk7XG5cbiAgICAgIG1hcmtTZWxlY3Rvci5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgIGNvbG9yU2VsZWN0b3IucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cbiAgICAgIC8vIHVwZGF0aW5nIHZpeiBpbWFnZXMgd2l0aCBuZXcgdmFsdWVzIHVwb24gYSBzZWxlY3RvciBjaGFuZ2VcbiAgICAgIG1hcmtTZWxlY3Rvci5jaGFuZ2UoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkZFZpekltYWdlKG1hcmtTZWxlY3Rvci52YWwoKSBhcyBNYXJrVHlwZSwgY29sb3JTZWxlY3Rvci52YWwoKSBhcyBzdHJpbmcpO1xuICAgICAgfSk7XG4gICAgICBjb2xvclNlbGVjdG9yLmNoYW5nZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRkVml6SW1hZ2UobWFya1NlbGVjdG9yLnZhbCgpIGFzIE1hcmtUeXBlLCBjb2xvclNlbGVjdG9yLnZhbCgpIGFzIHN0cmluZyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgdGhlIGlucHV0IHNwZWNpZmljYXRpb25zIGFuZCBkaXNwbGF5cyB0aGUgY3JlYXRlZCB2aXogaW1hZ2VcbiAgICAgKiBAcGFyYW0gbWFya1R5cGVcbiAgICAgKiBAcGFyYW0gY29sb3JQYWxldHRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBhZGRWaXpJbWFnZShtYXJrVHlwZTogTWFya1R5cGUsIHBhbGV0dGU6IHN0cmluZykge1xuICAgICAgLy8gQnVpbGRpbmcgdGhlIGlucHV0IHNwZWNpZmljYXRpb24gb2JqZWN0IHRoYXQgaXMgdXNlZCB0byBjcmVhdGUgdGhlIHZpeiBpbWFnZVxuICAgICAgLy8gRGF0YSB2YWx1ZXMgdXNlZCBpbiB0aGUgdml6IGltYWdlIGFyZSBwcmVmaWxsZWRcbiAgICAgIGNvbnN0IHZpeklucHV0U3BlYyA9IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHZhbHVlczogW1xuICAgICAgICAgICAge1Byb2R1Y3Q6ICdQYXBlcicsIFNhbGVzOiAyOCwgUmVnaW9uOiAnQ2VudHJhbCd9LFxuICAgICAgICAgICAge1Byb2R1Y3Q6ICdQZW5zJywgU2FsZXM6IDQ1LCBSZWdpb246ICdFYXN0J30sXG4gICAgICAgICAgICB7UHJvZHVjdDogJ1J1bGVycycsIFNhbGVzOiAzNSwgUmVnaW9uOiAnRWFzdCd9LFxuICAgICAgICAgICAge1Byb2R1Y3Q6ICdSdWxlcnMnLCBTYWxlczogNDMsIFJlZ2lvbjogJ1NvdXRoJ30sXG4gICAgICAgICAgICB7UHJvZHVjdDogJ1BhcGVyJywgU2FsZXM6IDUwLCBSZWdpb246ICdXZXN0J30sXG4gICAgICAgICAgICB7UHJvZHVjdDogJ1BlbnMnLCBTYWxlczogNTYsIFJlZ2lvbjogJ1dlc3QnfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdBIHNhbXBsZSB2aXonLCAvLyBvcHRpb25hbCBwYXJhbWV0ZXJcbiAgICAgICAgZW5jb2Rpbmc6IHtcbiAgICAgICAgICBjb2xvcjoge2ZpZWxkOiAnUHJvZHVjdCcsIHR5cGU6IHRhYmxlYXUuVml6SW1hZ2VFbmNvZGluZ1R5cGUuRGlzY3JldGUsIHBhbGV0dGV9LFxuICAgICAgICAgIGNvbHVtbnM6IHtmaWVsZDogJ1JlZ2lvbicsIHR5cGU6IHRhYmxlYXUuVml6SW1hZ2VFbmNvZGluZ1R5cGUuRGlzY3JldGV9LFxuICAgICAgICAgIHJvd3M6IHtmaWVsZDogJ1NhbGVzJywgdHlwZTogdGFibGVhdS5WaXpJbWFnZUVuY29kaW5nVHlwZS5Db250aW51b3VzfVxuICAgICAgICB9LFxuICAgICAgICBtYXJrOiBtYXJrVHlwZSxcbiAgICAgICAgbWFya2NvbG9yOiAnI0ZGRUQ1RicsIC8vIG1heSBub3QgZ2V0IHVzZWQgaW4gdml6IGlmIGNvbG9yIGlzIGVuY29kZWQgaW4gdml6XG4gICAgICAgIHNpemU6IHt3aWR0aDogNDAwLCBoZWlnaHQ6IDMwMH1cbiAgICAgIH07XG5cbiAgICAgIC8vIGRlZmF1bHRpbmcgdmFsdWVzIGlmIG51bGxcbiAgICAgIGlmIChtYXJrVHlwZSA9PT0gbnVsbCkge1xuICAgICAgICB2aXpJbnB1dFNwZWMubWFyayA9IHRhYmxlYXUuTWFya1R5cGUuQmFyO1xuICAgICAgfVxuICAgICAgaWYgKHBhbGV0dGUgPT09IG51bGwpIHtcbiAgICAgICAgdml6SW5wdXRTcGVjLmVuY29kaW5nLmNvbG9yLnBhbGV0dGUgPSAndGFibGVhdTIwXzEwXzAnO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzdmcgPSBhd2FpdCB0YWJsZWF1LmV4dGVuc2lvbnMuY3JlYXRlVml6SW1hZ2VBc3luYyh2aXpJbnB1dFNwZWMpO1xuICAgICAgLy8gbWFraW5nIGNhbGwgdG8gY3JlYXRlIHZpeiBpbWFnZSBmcm9tIHRoZSBpbnB1dCBzcGVjaWZpY2F0aW9uc1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtzdmddLCB7IHR5cGU6ICdpbWFnZS9zdmcreG1sJyB9KTtcbiAgICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgaW1hZ2Uuc3JjID0gdXJsO1xuICAgICAgaW1hZ2Uuc3R5bGUubWF4V2lkdGggPSAnMTAwJSc7XG4gICAgICBpbWFnZS5zdHlsZS5tYXhIZWlnaHQgPSAnMTAwJSc7XG4gICAgICBpbWFnZS5jbGFzc05hbWUgPSAnY2VudGVyLWJsb2NrJztcbiAgICAgIGNvbnN0IHZpekFwaUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndml6LWNvbnRhaW5lcicpO1xuICAgICAgLy8gY2xlYXJpbmcgVUkgYW5kIGFkZGluZyBpbiBuZXcgdml6XG4gICAgICB2aXpBcGlFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgdml6QXBpRWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZSk7XG4gICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4gVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBWaXpJbWFnZSBleHRlbnNpb24uJyk7XG4gIGF3YWl0IG5ldyBWaXpJbWFnZSgkKS5pbml0aWFsaXplKCk7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==