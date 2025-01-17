import { IInputs, IOutputs } from './generated/ManifestTypes';
import { CanvasPersona } from './components/CanvasPersona';
import { IPersonaprops } from './components/Component.types';
import * as React from 'react';
import { CanvasPersonaPresence, CanvasPersonaSizes, PersonaInitialsColors } from './ManifestTypes';

export class Persona implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    context: ComponentFramework.Context<IInputs>;
    
    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>): void {
        this.context = context;
        this.context.mode.trackContainerResize(true);
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const props: IPersonaprops = {
            themeJSON: context.parameters.Theme.raw ?? '',
            imageUrl: context.parameters?.ImageUrl.raw ?? '',
            imageInitials: context.parameters?.ImageInitials.raw ?? '',
            text: context.parameters?.Text.raw ?? '',
            secondaryText: context.parameters?.SecondaryText.raw ?? '',
            tertiaryText: context.parameters?.TertiaryText.raw ?? '',
            optionalText: context.parameters?.OptionalText.raw ?? '',
            imageAlt: context.parameters?.ImageAlt.raw ?? '',
            presence: CanvasPersonaPresence[context.parameters.Presence.raw],
            size: CanvasPersonaSizes[context.parameters.PersonaSize.raw],
            hidePersonaDetails: context.parameters.HidePersonaDetails.raw,
            ariaLabel: context.parameters.AccessibilityLabel.raw ?? '',
            initialsColor:PersonaInitialsColors[context.parameters.PersonaInitialsColor.raw]
        };
        return React.createElement(CanvasPersona, props);
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
