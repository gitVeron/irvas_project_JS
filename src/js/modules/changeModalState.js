import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
            windowWidth = document.querySelectorAll('#width'),
            windowHeight = document.querySelectorAll('#height'),
            windowType = document.querySelectorAll('#view_type'),
            windowProfile = document.querySelectorAll('.checkbox'),
            btnInput = document.querySelector('.popup_calc_button'),
            btnCheckbox = document.querySelector('.popup_calc_profile_button');

    checkNumInputs('#width');
    checkNumInputs('#height');

    btnInput.disabled = true;
    btnCheckbox.disabled = true;
    let errorDiv = document.createElement('div');
    errorDiv.innerHTML = 'Введите значения';
    errorDiv.classList = 'status';
    document.querySelector('.popup_calc_content').appendChild(errorDiv);

    let errorDiv1 = document.createElement('div');
    errorDiv1.innerHTML = 'Выберите значения';
    errorDiv1.classList = 'status';
    document.querySelector('.popup_calc_profile_content').appendChild(errorDiv1);

    function bindActionToElems (event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch(item.nodeName) {
                    case 'SPAN' :
                        state[prop] = i;
                        break;
                    case 'INPUT' :
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = 'Холодное' : state[prop] = 'Теплое';
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                }
                            });
                            validCalcForm(btnCheckbox, state.profile, state.type);
                        } else {
                            validCalcForm(btnInput, state.width, state.height);
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT' :
                        state[prop] = item.value;
                        break;
                }

                function validCalcForm (btn, elem1, elem2) {
                    if (elem1 != undefined && elem2 != undefined) {
                        btn.disabled = false;
                    }
                }
                
                validCalcForm(btnInput, state.width, state.height);
                validCalcForm(btnCheckbox, state.profile, state.type);
            });
        });    
    };

    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');
};

export default changeModalState;