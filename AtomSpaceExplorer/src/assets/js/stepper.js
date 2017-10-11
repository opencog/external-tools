/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * MDL Stepper - A library that implements to the Material Design Lite (MDL) a polyfill for stepper
	 * component specified by Material Design.
	 * @version v1.1.6
	 * @author Alexandre Thebaldi <ahlechandre@gmail.com>.
	 * @link https://github.com/ahlechandre/mdl-stepper
	 */

	(function () {
	  'use strict';

	  /**
	   * Class constructor for Stepper MDL component.
	   * Implements MDL component design pattern defined at:
	   * https://github.com/jasonmayes/mdl-component-design-pattern
	   *
	   * @constructor
	   * @param {HTMLElement} element The element that will be upgraded.
	   */

	  function MaterialStepper(element) {
	    this.element_ = element;

	    // initialize instance.
	    this.init();
	  }

	  window.MaterialStepper = MaterialStepper;

	  /**
	   * Store properties of stepper.
	   * @private
	   */
	  MaterialStepper.prototype.Stepper_ = {};

	  /**
	   * Get properties of stepper.
	   * @return {Object}
	   * @private
	   */
	  MaterialStepper.prototype.getStepper_ = function () {
	    return {
	      isLinear: this.element_.classList.contains(this.CssClasses_.STEPPER_LINEAR),
	      hasFeedback: this.element_.classList.contains(this.CssClasses_.STEPPER_FEEDBACK)
	    };
	  };

	  /**
	   * Store strings for steps states.
	   * @enum {string}
	   * @private
	   */
	  MaterialStepper.prototype.StepState_ = {
	    COMPLETED: 'completed',
	    ERROR: 'error',
	    NORMAL: 'normal'
	  };

	  /**
	   * Store strings for dataset attributes defined by this component that are used for
	   * JavaScript custom events.
	   *
	   * @enum {string}
	   * @private
	   */
	  MaterialStepper.prototype.DatasetAttributes_ = {
	    CONTINUE: 'stepper-next',
	    CANCEL: 'stepper-cancel',
	    SKIP: 'stepper-skip',
	    BACK: 'stepper-back'
	  };

	  /**
	   * Issue: https://github.com/ahlechandre/mdl-stepper/issues/14
	   * Returns a custom event object
	   * @param {string} evtName The name/type of custom event to create.
	   * @param {bool} bubble If event is bubbleable.
	   * @param {bool} cancel If event is cancelable.
	   * @returns {Event}
	   */
	  MaterialStepper.prototype.defineCustomEvent = function (evtName, bubble, cancel) {
	    var ev;
	    if ('CustomEvent' in window && typeof window.CustomEvent === 'function') {
	      ev = new Event(evtName, {
	        bubbles: bubble,
	        cancelable: cancel
	      });
	    } else {
	      ev = document.createEvent('Events');
	      ev.initEvent(evtName, bubble, cancel);
	    }
	    return ev;
	  };

	  /**
	   * Store the custom events applieds to the steps and stepper.
	   *
	   * @private
	   */
	  MaterialStepper.prototype.CustomEvents_ = {
	    onstepnext: MaterialStepper.prototype.defineCustomEvent('onstepnext', true, true),
	    onstepcancel: MaterialStepper.prototype.defineCustomEvent('onstepcancel', true, true),
	    onstepskip: MaterialStepper.prototype.defineCustomEvent('onstepskip', true, true),
	    onstepback: MaterialStepper.prototype.defineCustomEvent('onstepback', true, true),
	    onstepcomplete: MaterialStepper.prototype.defineCustomEvent('onstepcomplete', true, true),
	    onsteperror: MaterialStepper.prototype.defineCustomEvent('onsteperror', true, true),
	    onsteppercomplete: MaterialStepper.prototype.defineCustomEvent('onsteppercomplete', true, true)
	  };

	  /**
	   * Store strings for class names defined by this component that are used in
	   * JavaScript. This allows us to simply change it in one place should we
	   * decide to modify at a later date.
	   *
	   * @enum {string}
	   * @private
	   */
	  MaterialStepper.prototype.CssClasses_ = {
	    BUTTON_JS: 'mdl-js-button',
	    STEPPER_LINEAR: 'mdl-stepper--linear',
	    STEPPER_FEEDBACK: 'mdl-stepper--feedback',
	    STEP_COMPLETED: 'mdl-step--completed',
	    STEP_ERROR: 'mdl-step--error',
	    STEP_TRANSIENT: 'mdl-step--transient',
	    STEP_OPTIONAL: 'mdl-step--optional',
	    STEP_EDITABLE: 'mdl-step--editable',
	    IS_ACTIVE: 'is-active',
	    TRANSIENT: 'mdl-step__transient',
	    TRANSIENT_OVERLAY: 'mdl-step__transient-overlay',
	    TRANSIENT_LOADER: 'mdl-step__transient-loader',
	    SPINNER: 'mdl-spinner',
	    SPINNER_JS: 'mdl-js-spinner',
	    SPINNER_IS_ACTIVE: 'is-active',
	    STEPPER: 'mdl-stepper',
	    STEP: 'mdl-step',
	    STEP_LABEL: 'mdl-step__label',
	    STEP_LABEL_INDICATOR: 'mdl-step__label-indicator',
	    STEP_LABEL_INDICATOR_CONTENT: 'mdl-step__label-indicator-content',
	    STEP_TITLE: 'mdl-step__title',
	    STEP_TITLE_TEXT: 'mdl-step__title-text',
	    STEP_TITLE_MESSAGE: 'mdl-step__title-message',
	    STEP_CONTENT: 'mdl-step__content',
	    STEP_ACTIONS: 'mdl-step__actions'
	  };

	  /**
	   * Store collection of steps and important data about them
	   * @private
	   */
	  MaterialStepper.prototype.Steps_ = {};

	  /**
	   * Returns the label indicator for referred to the passed step.
	   * @param {MaterialStepper.Steps_.collection.<step>} step The step that will get
	   *                                                        the label indicator.
	   * @return {HTMLElement}
	   * @private
	   */
	  MaterialStepper.prototype.getIndicatorElement_ = function (step) {
	    /** @type {HTMLElement} */
	    var indicatorElement;
	    /** @type {HTMLElement} */
	    var indicatorContent;
	    indicatorElement = document.createElement('span');
	    indicatorContent = this.getIndicatorContentNormal_(step.labelndicatorText);
	    indicatorElement.classList.add(this.CssClasses_.STEP_LABEL_INDICATOR);
	    indicatorElement.appendChild(indicatorContent);
	    return indicatorElement;
	  };

	  /**
	   * Create a new element that's represent "normal" label indicator.
	   * @param {string} text The text content of indicator (e.g. 1, 2..N).
	   * @return {HTMLElement}
	   * @private
	   */
	  MaterialStepper.prototype.getIndicatorContentNormal_ = function (text) {
	    /** @type {HTMLElement} */
	    var normal;
	    normal = document.createElement('span');
	    normal.classList.add(this.CssClasses_.STEP_LABEL_INDICATOR_CONTENT);
	    normal.textContent = text;
	    return normal;
	  };

	  /**
	   * Create a new element that's represent "completed" label indicator.
	   * @param {boolean} isEditable Flag to check if step is of editable type.
	   * @return {HTMLElement}
	   * @private
	   */
	  MaterialStepper.prototype.getIndicatorContentCompleted_ = function (isEditable) {
	    // Creates a new material icon to represent the completed step.
	    /** @type {HTMLElement} */
	    var completed;
	    completed = document.createElement('i');
	    completed.classList.add('material-icons', this.CssClasses_.STEP_LABEL_INDICATOR_CONTENT);
	    // If step is editable the icon used will be "edit",
	    // else the icon will be "check".
	    completed.textContent = isEditable ? 'edit' : 'check';
	    return completed;
	  };

	  /**
	   * Create a new element that's represent "error" label indicator.
	   * @return {HTMLElement}
	   * @private
	   */
	  MaterialStepper.prototype.getIndicatorContentError_ = function () {
	    /** @type {HTMLElement} */
	    var error;
	    error = document.createElement('span');
	    error.classList.add(this.CssClasses_.STEP_LABEL_INDICATOR_CONTENT);
	    error.textContent = '!';
	    return error;
	  };

	  /**
	   * Defines a new step model.
	   * @param {HTMLElement} step The step element.
	   * @param {number} id The unique number for each step.
	   * @return {Object}
	   * @private
	   */
	  MaterialStepper.prototype.getStepModel_ = function (step, id) {
	    /** @type {Object} */
	    var model;
	    /** @type {string} */
	    var selectorActionsBack;
	    /** @type {string} */
	    var selectorActionsCancel;
	    /** @type {string} */
	    var selectorActionsNext;
	    /** @type {string} */
	    var selectorActionsSkip;
	    selectorActionsBack = '[data-' + this.DatasetAttributes_.BACK + ']';
	    selectorActionsCancel = '[data-' + this.DatasetAttributes_.CANCEL + ']';
	    selectorActionsNext = '[data-' + this.DatasetAttributes_.CONTINUE + ']';
	    selectorActionsSkip = '[data-' + this.DatasetAttributes_.SKIP + ']';
	    model = {};
	    model.container = step;
	    model.id = id;
	    model.label = step.querySelector('.' + this.CssClasses_.STEP_LABEL);
	    model.labelndicatorText = id;
	    model.labelTitle = step.querySelector('.' + this.CssClasses_.STEP_TITLE);
	    model.labelTitleText = step.querySelector('.' + this.CssClasses_.STEP_TITLE_TEXT).textContent;
	    model.labelTitleMessage = step.querySelector('.' + this.CssClasses_.STEP_TITLE_MESSAGE);
	    model.labelTitleMessageText = model.labelTitleMessage ? model.labelTitleMessage.textContent : '';
	    model.content = step.querySelector('.' + this.CssClasses_.STEP_CONTENT);
	    model.actions = step.querySelector('.' + this.CssClasses_.STEP_ACTIONS);
	    model.actionsBack = model.actions.querySelector(selectorActionsBack) || null;
	    model.actionsCancel = model.actions.querySelector(selectorActionsCancel) || null;
	    model.actionsNext = model.actions.querySelector(selectorActionsNext) || null;
	    model.actionsSkip = model.actions.querySelector(selectorActionsSkip) || null;
	    model.labelIndicator = model.label.querySelector('.' + this.CssClasses_.STEP_LABEL_INDICATOR);

	    if (!model.labelIndicator) {
	      // Creates a new indicator for the label if not exists
	      model.labelIndicator = this.getIndicatorElement_(model);
	      model.label.appendChild(model.labelIndicator);
	    }

	    if (step.classList.contains(this.CssClasses_.STEP_COMPLETED)) {
	      model.state = this.StepState_.COMPLETED;
	    } else if (step.classList.contains(this.CssClasses_.STEP_ERROR)) {
	      model.state = this.StepState_.ERROR;
	    } else {
	      model.state = this.StepState_.NORMAL;
	    }
	    model.isActive = step.classList.contains(this.CssClasses_.IS_ACTIVE);
	    model.isOptional = step.classList.contains(this.CssClasses_.STEP_OPTIONAL);
	    model.isEditable = step.classList.contains(this.CssClasses_.STEP_EDITABLE);
	    return model;
	  };

	  /**
	   * Get the active step element.
	   * @return {HTMLElement}
	   */
	  MaterialStepper.prototype.getActive = function () {
	    return this.Steps_.collection[this.Steps_.active - 1].container;
	  };

	  /**
	   * Get the active step id.
	   * @return {number}
	   */
	  MaterialStepper.prototype.getActiveId = function () {
	    return this.Steps_.collection[this.Steps_.active - 1].id;
	  };

	  /**
	   * Load the model of all steps and store inside a collection.
	   * @return {Object}
	   * @private
	   */
	  MaterialStepper.prototype.getSteps_ = function () {
	    /** @type {array} */
	    var collection;
	    /** @type {number} */
	    var total;
	    /** @type {number} */
	    var completed;
	    /** @type {number} */
	    var optional;
	    /** @type {number} */
	    var active;
	    /** @type {HTMLElement} */
	    var stepElements;
	    /** @type {number} */
	    var i;
	    collection = [];
	    total = 0;
	    completed = 0;
	    optional = 0;
	    active = 0;
	    stepElements = this.element_.querySelectorAll('.' + this.CssClasses_.STEP);

	    for (i = 0; i < stepElements.length; i++) {
	      collection[i] = this.getStepModel_(stepElements[i], i + 1);

	      if (collection[i].isOptional) {
	        optional += 1;
	      }

	      if (collection[i].isActive) {
	        active = collection[i].id;
	      }

	      // Prevents the step label to scrolling out of user view on Google Chrome.
	      // More details here: <https://github.com/ahlechandre/mdl-stepper/issues/11 />.
	      stepElements[i].addEventListener('scroll', function (event) {
	        event.target.scrollTop = 0;
	      });
	    }
	    total = collection.length;
	    return {
	      collection: collection,
	      total: total,
	      completed: completed,
	      optional: optional,
	      active: active
	    };
	  };

	  /**
	   * Defines a specific step as "active".
	   * @param {MaterialStepper.Steps_.collection<step>} step A model of step.
	   * @return {boolean}
	   * @private
	   */
	  MaterialStepper.prototype.setStepActive_ = function (step) {
	    /** @type {function} */
	    var stepsDeactivator;

	    // The transient effect blocks the stepper to move
	    if (this.hasTransient()) return false;

	    stepsDeactivator = function stepsDeactivator(step) {
	      step.container.classList.remove(this.CssClasses_.IS_ACTIVE);

	      if (step.isActive) {
	        step.isActive = false;
	      }
	    };
	    this.Steps_.collection.forEach(stepsDeactivator.bind(this));
	    // remove if step was in transient (feedback) effect
	    step.container.classList.remove(this.CssClasses_.STEP_TRANSIENT);
	    step.container.classList.add(this.CssClasses_.IS_ACTIVE);
	    step.isActive = true;
	    this.Steps_.active = step.id;
	    return true;
	  };

	  /**
	   * Defines as "active" the first step or a specific id.
	   * @param {number | undefined} id Unique number of a step.
	   * @return {boolean}
	   * @private
	   */
	  MaterialStepper.prototype.setActive_ = function (id) {
	    /** @type {HTMLElement | null} */
	    var active;
	    /** MaterialStepper.Steps_.collection<step> */
	    var first;
	    /** @type {number} */
	    var i;
	    /** @type {boolean} */
	    var moved;
	    /** MaterialStepper.Steps_.collection<step> */
	    var step;

	    // Return false if specified id is less or equal 0 and bigger than the last step
	    if (!isNaN(id) && (id > this.Steps_.total || id <= 0)) return false;

	    moved = false;

	    if (id) {
	      for (i = 0; i < this.Steps_.total; i++) {
	        step = this.Steps_.collection[i];

	        if (step.id === id) {
	          moved = this.setStepActive_(step);
	          break;
	        }
	      }
	    } else {
	      active = this.element_.querySelector('.' + this.CssClasses_.IS_ACTIVE);

	      if (!active) {
	        // Set the first step as "active" if none id was specified and
	        // no "active" step was found at the DOM.
	        first = this.Steps_.collection[0];
	        moved = this.setStepActive_(first);
	      }
	    }

	    if (this.Stepper_.isLinear) {
	      // We know that all steps previous the "active" are "completed"
	      // case the stepper is linear
	      this.updateLinearStates_();
	    }
	    return moved;
	  };

	  /**
	   * Change the state of a step
	   * @param {MaterialStepper.Steps_.collection<step>} step The step to be updated.
	   * @param {string} state The step state ("completed", "error" or "normal").
	   * @return {boolean}
	   * @private
	   */
	  MaterialStepper.prototype.updateStepState_ = function (step, state) {
	    /** @type {string} */
	    var stateClass;
	    /** @type {HTMLElement} */
	    var indicatorContent;
	    /** @type {HTMLElement} */
	    var currentIndicatorContent;
	    /** @type {boolean} */
	    var stepperCompleted;
	    /** @type {boolean} */
	    var hasRequired;
	    /** @type {MaterialStepper.Steps_.collection<stepItem>} */
	    var stepItem;
	    /** @type {number} */
	    var item;
	    /** @type {string} */
	    var selectorIndicator;
	    selectorIndicator = '.' + this.CssClasses_.STEP_LABEL_INDICATOR_CONTENT;

	    // Can't update the state for the same.
	    if (step.state === state) return false;

	    // Case the current step state to change is "completed",
	    // we can decrement the total number of completed.
	    if (step.state === this.StepState_.COMPLETED) {
	      this.Steps_.completed -= 1;
	    }
	    currentIndicatorContent = step.labelIndicator.querySelector(selectorIndicator);

	    switch (state) {
	      case this.StepState_.COMPLETED:
	        {
	          // Case changing the current step state to "completed",
	          // we can increment the total number of completed.
	          this.Steps_.completed += 1;
	          step.container.classList.remove(this.CssClasses_.STEP_ERROR);
	          indicatorContent = this.getIndicatorContentCompleted_(step.isEditable);
	          stateClass = this.CssClasses_.STEP_COMPLETED;
	          break;
	        }
	      case this.StepState_.ERROR:
	        {
	          step.container.classList.remove(this.CssClasses_.STEP_COMPLETED);
	          indicatorContent = this.getIndicatorContentError_();
	          stateClass = this.CssClasses_.STEP_ERROR;
	          break;
	        }
	      case this.StepState_.NORMAL:
	        {
	          step.container.classList.remove(this.CssClasses_.STEP_COMPLETED);
	          step.container.classList.remove(this.CssClasses_.STEP_ERROR);
	          indicatorContent = this.getIndicatorContentNormal_(step.labelndicatorText);
	          break;
	        }
	      default:
	        {
	          break;
	        }
	    }

	    // "normal" is the default state and don't have specific css class.
	    if (stateClass) {
	      step.container.classList.add(stateClass);
	    }
	    step.labelIndicator.replaceChild(indicatorContent, currentIndicatorContent);
	    step.state = state;

	    // Case the total number of completed steps
	    // are equal the total number of steps less the optionals
	    // or total number of completed steps are equal the total number of steps,
	    // we can consider that the stepper are successfully complete and
	    // dispatch the custom event.
	    stepperCompleted = false;

	    if (this.Steps_.completed === this.Steps_.total) {
	      stepperCompleted = true;
	    } else if (this.Steps_.completed === this.Steps_.total - this.Steps_.optional) {
	      for (item in this.Steps_.collection) {
	        // eslint guard-for-in.
	        if (this.Steps_.collection.hasOwnProperty(item)) {
	          stepItem = this.Steps_.collection[item];
	          hasRequired = !stepItem.isOptional && stepItem.state !== this.StepState_.COMPLETED;

	          if (hasRequired) break;
	        }
	      }
	      stepperCompleted = !hasRequired;
	    }

	    if (stepperCompleted) {
	      this.dispatchEventOnStepperComplete_();
	    }

	    return true;
	  };

	  /**
	   * Change to "completed" the state of all steps previous the "active"
	   * except the optionals.
	   * @return {undefined}
	   * @private
	   */
	  MaterialStepper.prototype.updateLinearStates_ = function () {
	    /** @type {number} */
	    var i;

	    for (i = 0; i < this.Steps_.total; i++) {
	      if (this.Steps_.collection[i].isActive) {
	        break;
	      } else {
	        if (this.Steps_.collection[i].isOptional) continue;

	        this.updateStepState_(this.Steps_.collection[i], this.StepState_.COMPLETED);
	      }
	    }
	  };

	  /**
	   * Move "active" to the previous step. This operation can returns false
	   * if it does not regress the step.
	   * @return {boolean}
	   */
	  MaterialStepper.prototype.back = function () {
	    /** @type {boolean} */
	    var moved;
	    /** @type {function} */
	    var moveStep;
	    /** @type {string} */
	    var model;
	    /** @type {MaterialStepper.Steps_.collection<step>} */
	    var step;
	    /** @type {MaterialStepper.Steps_.collection<step>} */
	    var previous;
	    moved = false;
	    moveStep = function moveStep(step) {
	      /** @type {boolean} */
	      var stepActivated;
	      stepActivated = this.setActive_(step.id);

	      if (stepActivated) {
	        if (stepActivated && this.Stepper_.hasFeedback) {
	          // Remove the (feedback) transient effect before move.
	          this.removeTransientEffect_(step);
	        }
	      }
	      return stepActivated;
	    };

	    for (model in this.Steps_.collection) {
	      // Rule eslint guard-for-in.
	      if (this.Steps_.collection.hasOwnProperty(model)) {
	        step = this.Steps_.collection[model];

	        if (step.isActive) {
	          previous = this.Steps_.collection[step.id - 2];

	          if (!previous) return false;

	          if (this.Stepper_.isLinear) {
	            if (previous.isEditable) {
	              moved = moveStep.bind(this)(previous);
	            }
	          } else {
	            moved = moveStep.bind(this)(previous);
	          }
	          break;
	        }
	      }
	    }
	    return moved;
	  };

	  /**
	   * Move "active" to the next if the current step is optional. This operation can returns false
	   * if it does not advances the step.
	   * @return {boolean}
	   */
	  MaterialStepper.prototype.skip = function () {
	    /** @type {boolean} */
	    var moved;
	    /** @type {string} */
	    var model;
	    /** @type {MaterialStepper.Steps_.collection<step>} */
	    var step;
	    moved = false;

	    for (model in this.Steps_.collection) {
	      // Rule eslint guard-for-in.
	      if (this.Steps_.collection.hasOwnProperty(model)) {
	        step = this.Steps_.collection[model];

	        if (step.isActive) {
	          if (step.isOptional) {
	            moved = this.setActive_(step.id + 1);

	            if (moved && this.Stepper_.hasFeedback) {
	              // Remove the (feedback) transient effect before move
	              this.removeTransientEffect_(step);
	            }
	          }
	          break;
	        }
	      }
	    }
	    return moved;
	  };

	  /**
	   * Move "active" to specified step id.
	   * This operation is similar to the MaterialStepper.setActive_(<number>).
	   * @param {number} id Unique number for step.
	   * @return {boolean}
	   */
	  MaterialStepper.prototype.goto = function (id) {
	    return this.setActive_(id);
	  };

	  /**
	   * Defines the current state of step to "error" and display
	   * an alert message instead of default title message.
	   * @param {string} message The text content to show with error state.
	   * @return {undefined}
	   */
	  MaterialStepper.prototype.error = function (message) {
	    /** @type {string} */
	    var model;
	    /** @type {MaterialStepper.Steps_.collection<step>} */
	    var step;

	    for (model in this.Steps_.collection) {
	      // Rule eslint guard-for-in.
	      if (this.Steps_.collection.hasOwnProperty(model)) {
	        step = this.Steps_.collection[model];

	        if (step.isActive) {
	          if (this.Stepper_.hasFeedback) {
	            // Remove the (feedback) transient effect before move.
	            this.removeTransientEffect_(step);
	          }
	          this.updateStepState_(step, this.StepState_.ERROR);

	          if (message) {
	            this.updateTitleMessage_(step, message);
	          }
	          // Now dispatch on step the custom event "onsteperror".
	          this.dispatchEventOnStepError_(step);
	          break;
	        }
	      }
	    }
	  };

	  /**
	  * Defines current step state to "completed" and move active to the next.
	  * This operation can returns false if it does not advance the step.
	  * @return {boolean}
	  */
	  MaterialStepper.prototype.next = function () {
	    /** @type {boolean} */
	    var moved;
	    /** @type {MaterialStepper.Steps_.collection<step>} */
	    var step;
	    /** @type {number} */
	    var activate;
	    /** @type {string} */
	    var model;
	    /** @type {string} */
	    var item;
	    /** @type {MaterialStepper.Steps_.collection<stepItem>} */
	    var stepItem;
	    moved = false;

	    for (model in this.Steps_.collection) {
	      // Rule eslint guard-for-in.
	      if (this.Steps_.collection.hasOwnProperty(model)) {
	        step = this.Steps_.collection[model];

	        if (step.isActive) {
	          activate = step.id + 1;

	          if (this.Stepper_.hasFeedback) {
	            // Remove the (feedback) transient effect before move
	            this.removeTransientEffect_(step);
	          }

	          if (step.state === this.StepState_.ERROR) {
	            // Case the current state of step is "error", update the error message
	            // to the original title message or just remove it.
	            if (step.labelTitleMessageText) {
	              this.updateTitleMessage_(step, step.labelTitleMessageText);
	            } else {
	              this.removeTitleMessage_(step);
	            }
	          }

	          if (step.isEditable && this.Stepper_.isLinear) {
	            // In linear steppers if the current step is editable the stepper needs to find
	            // the next step without "completed" state
	            for (item in this.Steps_.collection) {
	              // Rule eslint guard-for-in.
	              if (this.Steps_.collection.hasOwnProperty(item)) {
	                stepItem = this.Steps_.collection[item];

	                if (stepItem.id > step.id && stepItem.state !== this.StepState_.COMPLETED) {
	                  activate = stepItem.id;
	                  break;
	                }
	              }
	            }
	          }
	          moved = this.setActive_(activate);

	          // Update "manually" the state of current step to "completed" because
	          // MaterialStepper.setActive_(<number>) can't change the state of non-linears steppers
	          // and can't change the state of optional or last step in linears steppers.
	          if (this.Stepper_.isLinear) {
	            if (step.isOptional || step.id === this.Steps_.total) {
	              this.updateStepState_(step, this.StepState_.COMPLETED);
	            }
	          } else {
	            this.updateStepState_(step, this.StepState_.COMPLETED);
	          }

	          // Now dispatch on step the custom event "onstepcomplete"
	          this.dispatchEventOnStepComplete_(step);
	          break;
	        }
	      }
	    }
	    return moved;
	  };

	  /**
	   * Update the title message or creates a new if it not exists.
	   * @param {MaterialStepper.Steps_.collection<step>} step The step of label to be updated.
	   * @param {string} text The text content to update.
	   * @return {undefined}
	   */
	  MaterialStepper.prototype.updateTitleMessage_ = function (step, text) {
	    /** @type {HTMLElement | null} */
	    var titleMessage;
	    titleMessage = step.container.querySelector('.' + this.CssClasses_.STEP_TITLE_MESSAGE);

	    if (!titleMessage) {
	      titleMessage = document.createElement('span');
	      titleMessage.classList.add(this.CssClasses_.STEP_TITLE_MESSAGE);
	      step.labelTitle.appendChild(titleMessage);
	    }
	    titleMessage.textContent = text;
	  };

	  /**
	   * Remove the title message if it exists.
	   * @param {MaterialStepper.Steps_.collection<step>} step The step to remove title message.
	   * @return {undefined}
	   */
	  MaterialStepper.prototype.removeTitleMessage_ = function (step) {
	    /** @type {HTMLElement | null} */
	    var titleMessage;
	    titleMessage = step.container.querySelector('.' + this.CssClasses_.STEP_TITLE_MESSAGE);

	    if (titleMessage) {
	      titleMessage.parentNode.removeChild(titleMessage);
	    }
	  };

	  /**
	   * Remove (feedback) transient effect and applied to the step.
	   * @param {MaterialStepper.Steps_.collection<step>} step The step to remove effect.
	   * @return {boolean}
	   */
	  MaterialStepper.prototype.removeTransientEffect_ = function (step) {
	    /** @type {HTMLElement | null} */
	    var transient;
	    transient = step.content.querySelector('.' + this.CssClasses_.TRANSIENT);

	    if (!transient) return false;

	    step.container.classList.remove(this.CssClasses_.STEP_TRANSIENT);
	    step.content.removeChild(transient);
	    return true;
	  };

	  /**
	   * Create (feedback) transient effect and apply to the current step.
	   * @param {MaterialStepper.Steps_.collection<step>} step The step to add effect.
	   * @return {boolean}
	   */
	  MaterialStepper.prototype.addTransientEffect_ = function (step) {
	    /** @type {HTMLElement} */
	    var transient;
	    /** @type {HTMLElement} */
	    var overlay;
	    /** @type {HTMLElement} */
	    var loader;
	    /** @type {HTMLElement} */
	    var spinner;

	    if (step.content.querySelector('.' + this.CssClasses_.TRANSIENT)) return false;

	    transient = document.createElement('div');
	    overlay = document.createElement('div');
	    loader = document.createElement('div');
	    spinner = document.createElement('div');
	    transient.classList.add(this.CssClasses_.TRANSIENT);
	    overlay.classList.add(this.CssClasses_.TRANSIENT_OVERLAY);
	    loader.classList.add(this.CssClasses_.TRANSIENT_LOADER);
	    spinner.classList.add(this.CssClasses_.SPINNER);
	    spinner.classList.add(this.CssClasses_.SPINNER_JS);
	    spinner.classList.add(this.CssClasses_.SPINNER_IS_ACTIVE);
	    loader.appendChild(spinner);
	    transient.appendChild(overlay);
	    transient.appendChild(loader);
	    step.container.classList.add(this.CssClasses_.STEP_TRANSIENT);
	    step.content.appendChild(transient);
	    // Assume componentHandler is available in the global scope.
	    componentHandler.upgradeDom();
	    return true;
	  };

	  /**
	   * Add event listener to linear, non-linear steppers and dispatch the custom events.
	   * @return {undefined}
	   */
	  MaterialStepper.prototype.setCustomEvents_ = function () {
	    /** @type {function} */
	    var linearLabels;
	    /** @type {function} */
	    var nonLinearLabels;
	    /** @type {function} */
	    var dispatchCustomEvents;

	    linearLabels = function linearLabels(step) {
	      // We know that editable steps can be activated by click on label case it's completed
	      if (step.isEditable) {
	        step.label.addEventListener('click', function (event) {
	          event.preventDefault();

	          if (step.state === this.StepState_.COMPLETED) {
	            this.setStepActive_(step);
	          }
	        }.bind(this));
	      }
	    };
	    nonLinearLabels = function nonLinearLabels(step) {
	      step.label.addEventListener('click', function (event) {
	        event.preventDefault();
	        this.setStepActive_(step);
	      }.bind(this));
	    };
	    dispatchCustomEvents = function dispatchCustomEvents(step) {
	      this.dispatchEventOnStepNext_(step);
	      this.dispatchEventOnStepCancel_(step);
	      this.dispatchEventOnStepSkip_(step);
	      this.dispatchEventOnStepBack_(step);
	    };

	    if (this.Stepper_.isLinear) {
	      this.Steps_.collection.forEach(linearLabels.bind(this));
	    } else {
	      this.Steps_.collection.forEach(nonLinearLabels.bind(this));
	    }
	    this.Steps_.collection.forEach(dispatchCustomEvents.bind(this));
	  };

	  /**
	   * Dispatch "onstepcomplete" event on step when method stepper.next() is invoked to the
	   * current and return true. Or just when the active step change your state to "completed".
	   * @param {MaterialStepper.Steps_.collection<step>} step The step to dispatch event.
	   * @return {undefined}
	   */
	  MaterialStepper.prototype.dispatchEventOnStepComplete_ = function (step) {
	    step.container.dispatchEvent(this.CustomEvents_.onstepcomplete);
	  };

	  /**
	   * Dispatch "onsteperror" event on step when method stepper.error('Your alert message')
	   * is invoked to the current step and return true. Or just when the active step
	   * change your state to "error".
	   * @param {MaterialStepper.Steps_.collection<step>} step The step to dispatch event.
	   * @return {undefined}
	   */
	  MaterialStepper.prototype.dispatchEventOnStepError_ = function (step) {
	    step.container.dispatchEvent(this.CustomEvents_.onsteperror);
	  };

	  /**
	   * Dispatch "onsteppercomplete" event on stepper when all steps are completed.
	   * If there is optionals steps, they will be ignored.
	   * @return {undefined}
	   */
	  MaterialStepper.prototype.dispatchEventOnStepperComplete_ = function () {
	    this.element_.dispatchEvent(this.CustomEvents_.onsteppercomplete);
	  };

	  /**
	   * Dispatch "onstepnext" event on step when the step action button/link with
	   * [data-stepper-next] attribute is clicked.
	   * @param {MaterialStepper.Steps_.collection<step>} step The step to dispatch event.
	   * @return {boolean}
	   */
	  MaterialStepper.prototype.dispatchEventOnStepNext_ = function (step) {
	    if (!step.actionsNext) return false;

	    step.actionsNext.addEventListener('click', function () {
	      if (this.Stepper_.hasFeedback) {
	        this.addTransientEffect_(step);
	      }
	      step.container.dispatchEvent(this.CustomEvents_.onstepnext);
	    }.bind(this));

	    return true;
	  };

	  /**
	   * Dispatch "onstepcancel" event on step when the step action button/link with
	   * [data-stepper-cancel] attribute is clicked.
	   * @param {MaterialStepper.Steps_.collection<step>} step The step to dispatch event.
	   * @return {boolean}
	   */
	  MaterialStepper.prototype.dispatchEventOnStepCancel_ = function (step) {
	    if (!step.actionsCancel) return false;

	    step.actionsCancel.addEventListener('click', function (event) {
	      event.preventDefault();
	      step.container.dispatchEvent(this.CustomEvents_.onstepcancel);
	    }.bind(this));

	    return true;
	  };

	  /**
	   * Dispatch "onstepskip" event on step when the step action button/link with
	   * [data-stepper-skip] attribute is clicked.
	   * @param {MaterialStepper.Steps_.collection<step>} step The step to dispatch event.
	   * @return {boolean}
	   */
	  MaterialStepper.prototype.dispatchEventOnStepSkip_ = function (step) {
	    if (!step.actionsSkip) return false;

	    step.actionsSkip.addEventListener('click', function (event) {
	      event.preventDefault();
	      step.container.dispatchEvent(this.CustomEvents_.onstepskip);
	    }.bind(this));
	    return true;
	  };

	  /**
	   * Dispatch "onstepback" event on step when the step action button/link with
	   * [data-stepper-back] attribute is clicked.
	   * @param {MaterialStepper.Steps_.collection<step>} step The step to dispatch event.
	   * @return {boolean}
	   */
	  MaterialStepper.prototype.dispatchEventOnStepBack_ = function (step) {
	    if (!step.actionsBack) return false;

	    step.actionsBack.addEventListener('click', function (event) {
	      event.preventDefault();
	      step.container.dispatchEvent(this.CustomEvents_.onstepback);
	    }.bind(this));
	    return true;
	  };

	  /**
	   * Check if has some active transient effect on steps.
	   * @return {boolean}
	   */
	  MaterialStepper.prototype.hasTransient = function () {
	    /** @type {string} */
	    var cssClasseStep;
	    /** @type {string} */
	    var cssClasseStepContent;
	    /** @type {string} */
	    var cssClasseTransient;
	    /** @type {string} */
	    var selectorTransient;
	    /** @type {HTMLElement | null} */
	    var transient;
	    cssClasseStep = '.' + this.CssClasses_.STEP;
	    cssClasseStepContent = '.' + this.CssClasses_.STEP_CONTENT;
	    cssClasseTransient = '.' + this.CssClasses_.TRANSIENT;
	    selectorTransient = cssClasseStep + ' > ' + cssClasseStepContent + ' > ' + cssClasseTransient;
	    transient = this.element_.querySelector(selectorTransient);
	    return transient !== null;
	  };

	  /**
	   * Initialize the instance.
	   * @return {undefined}
	   * @public
	   */
	  MaterialStepper.prototype.init = function () {
	    // Check if stepper element exists.
	    if (this.element_) {
	      this.Stepper_ = this.getStepper_();
	      this.Steps_ = this.getSteps_();
	      this.setActive_();
	      this.setCustomEvents_();
	    }
	  };

	  // The component registers itself. It can assume componentHandler is available
	  // in the global scope.
	  componentHandler.register({
	    constructor: MaterialStepper,
	    classAsString: 'MaterialStepper',
	    cssClass: 'mdl-stepper',
	    widget: true
	  });
	})();

/***/ }
/******/ ]);