/*
 * Copyright (C) 2018 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.optaplanner.openshift.employeerostering.gwtui.client.beta.java.model;

public interface LinearScale<T> {

    default Long toGridPixels(final T valueInScaleUnits) {
        return toGridPixelsWithFactor1(valueInScaleUnits) / factor();
    }

    default T toScaleUnits(final Long valueInGridPixels) {
        return toScaleUnitsWithFactor1(valueInGridPixels * factor());
    }

    Long toGridPixelsWithFactor1(final T valueInScaleUnits);

    T toScaleUnitsWithFactor1(final Long valueInGridPixels);

    T getEndInScaleUnits();

    /**
     * @return How many scale units correspond to one grid pixel
     */
    Long factor();
}