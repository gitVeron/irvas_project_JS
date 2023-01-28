import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs  = document.querySelectorAll('input'),
        message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так'
        },
        
        postData = async (url, data) => {
                form.querySelector('.status').textContent = message.loading;
                let res = await fetch(url, {
                    method: 'POST',
                    body: data
                });
                
                return await res.text();
            },

        clearInputs = () => {
            inputs.forEach(item => {
                item.value = '';
            });
        };
    
    checkNumInputs('input[name="user_phone"]');

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') == 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                    delete state[key];
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();

                    setTimeout(() => {
                        statusMessage.remove();
                        const modal = {
                            0: '.popup_engineer',
                            1: '.popup',
                            2: '.popup_calc',
                            3: '.popup_calc_profile',
                            4: '.popup_calc_end'
                        }
                        for (let i = 0; i < 5; i++) {
                            document.querySelector(modal[i]).style.display = 'none';
                        };

                        document.querySelector('.popup_calc_button').disabled = true;
                        document.querySelector('.popup_calc_profile_button').disabled = true;
                    }, 5000);
                });
        });
    });

};

export default forms;