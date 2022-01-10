using System.Collections;
using System.IO;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;

public class InternetCheck : MonoBehaviour
{
    private string token = null;

    private string login_email;
    private string login_password;

    public enum APIType
    {
        Login,
        Logout
    }

    void Start()
    {
        if (Application.internetReachability == NetworkReachability.NotReachable)
        {
            // 인터넷 연결이 안된경우
            ErrorCheck(-1000); // 인터넷 연결 에러
        }
        else
        {
            // 인터넷 연결이 된 경우
            StartCoroutine(APIExample(APIType.Login));
        }
    }

    IEnumerator APIExample(APIType _type)
    {
        switch (_type)
        {
            case APIType.Login:
                yield return StartCoroutine(API_Login());
                break;
        }
        yield return null;
    }

    #region API_Func
    /// <summary>
    /// API로 로그인하여 토큰을 가져오는 함수
    /// 이때 가져온 토큰은 token 변수에 저장
    /// </summary>
    /// <returns>token = Gettoken</returns>
    IEnumerator API_Login()
    {
        UnityWebRequest request;///아직 서버 주소 안정해져있음..
        using (request = UnityWebRequest.Post("http://___/login?email=" + login_email + "&password=" + login_password, ""))
        {
            yield return request.SendWebRequest();
            if (request.isNetworkError)
            {
                Debug.Log(request.error);
            }
            else
            {
                SetToken(request.downloadHandler.text);
                if (request.responseCode != 200)
                    ErrorCheck(-(int)request.responseCode, "API_Login");
            }
        }
    }

    /// <summary>
    /// API로 Logout을 하는 함수.
    /// 로그아웃시 가지고 있던 토큰값은 초기화됨.
    /// </summary>
    /// <returns>token = null</returns>
    IEnumerator API_Logout()
    {
        UnityWebRequest request;
        using (request = UnityWebRequest.Get("http://___/logout"))
        {
            request.SetRequestHeader("Content-Type", "application/json");
            request.SetRequestHeader("Authorization", "Bearer " + token);
            yield return request.SendWebRequest();

            if (request.isNetworkError)
            {
                Debug.Log(request.error);
            }
            else
            {
                SetToken(null);
                if (request.responseCode != 200)
                    ErrorCheck(-(int)request.responseCode, "API_Logout");
            }
        }
    }

    /// <summary>
    /// WWWForm을 이용한 Post API
    /// </summary>
    /// <returns></returns>
    public IEnumerator API_Post_Form()
    {
        UnityWebRequest request;

        WWWForm form = new WWWForm();
        form.AddField("userId", "JhonDo");
        form.AddField("type", "page");

        using (request = UnityWebRequest.Post("http://___", form))
        {
            request.SetRequestHeader("Id", "__");
            request.SetRequestHeader("authToken", token);
            yield return request.SendWebRequest();

            if (request.isNetworkError)
            {
                Debug.Log(request.error);
            }
            else
            {
                Debug.Log(request.downloadHandler.text.JsonPrettyPrint());
                if (request.responseCode != 200)
                    ErrorCheck(-(int)request.responseCode, "API_Post_Form");
            }
        }
    }


    int SetToken(string _input)
    {
        // 로그아웃시 토큰 초기화
        if (_input == null)
        {
            token = null;
            return 0;
        }

        // 로그인시 토큰 설정
        string[] temp = _input.Split('"');

        if (temp.Length != 5 || temp[1] != "token")
            ErrorCheck(-1001); // 토큰 형식 에러

        token = temp[3];
        return 0;
    }
    #endregion

    #region Occur Error
    int ErrorCheck(int _code)
    {
        if (_code > 0) return 0;
        else if (_code == -1000) Debug.LogError(_code + ", Internet Connect Error");
        else if (_code == -1001) Debug.LogError(_code + ", Occur token type Error");
        else if (_code == -1002) Debug.LogError(_code + ", Category type Error");
        else if (_code == -1003) Debug.LogError(_code + ", Item type Error");
        else Debug.LogError(_code + ", Undefined Error");
        return _code;
    }

    int ErrorCheck(int _code, string _funcName)
    {
        if (_code > 0) return 0;
        else if (_code == -400) Debug.LogError(_code + ", Invalid request in " + _funcName);
        else if (_code == -401) Debug.LogError(_code + ", Unauthorized in " + _funcName);
        else if (_code == -404) Debug.LogError(_code + ", not found in " + _funcName);
        else if (_code == -500) Debug.LogError(_code + ", Internal Server Error in " + _funcName);
        else Debug.LogError(_code + ", Undefined Error");
        return _code;
    }
    #endregion
}